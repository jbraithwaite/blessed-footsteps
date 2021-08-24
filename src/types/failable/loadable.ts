export interface Pending {
  state: 'pending';
  loading: false;
}

export interface Loading {
  state: 'pending';
  loading: true;
}

export interface Failure<E> {
  state: 'failure';
  error: E;
  loading: false;
}

export interface Retrying<E> {
  state: 'failure';
  error: E;
  loading: true;
}

export interface Success<Value> {
  state: 'success';
  value: Value;
  loading: false;
}

export interface Reloading<Value> {
  state: 'success';
  value: Value;
  loading: true;
}

export type Loadable<Value, E = Error> =
  | Pending
  | Loading
  | Failure<E>
  | Retrying<E>
  | Success<Value>
  | Reloading<Value>;

export function initial(isLoading?: false): Pending;
export function initial(isLoading: true): Loading;
export function initial(isLoading: boolean): Pending | Loading;
export function initial(isLoading: boolean = false): Pending | Loading {
  return {
    state: 'pending',
    loading: isLoading,
  };
}

export function pending(): Pending {
  return initial(false);
}

export { makeLoading as loading };
function makeLoading(): Loading {
  return initial(true);
}

export function failed<E>(error: E, isLoading?: false): Failure<E>;
export function failed<E>(error: E, isLoading: true): Retrying<E>;
export function failed<E>(
  error: E,
  isLoading: boolean,
): Failure<E> | Retrying<E>;
export function failed<E>(
  error: E,
  isLoading: boolean = false,
): Failure<E> | Retrying<E> {
  return {
    state: 'failure',
    error,
    loading: isLoading,
  };
}

export function failure<E>(error: E): Failure<E> {
  return failed(error, false);
}

export function retrying<E>(error: E): Retrying<E> {
  return failed(error, true);
}

export function succeed<Value>(value: Value, isLoading?: false): Success<Value>;
export function succeed<Value>(value: Value, isLoading: true): Reloading<Value>;
export function succeed<Value>(
  value: Value,
  isLoading: boolean,
): Success<Value> | Reloading<Value>;
export function succeed<Value>(
  value: Value,
  isLoading: boolean = false,
): Success<Value> | Reloading<Value> {
  return {
    state: 'success',
    value,
    loading: isLoading,
  };
}

export function success<Value>(
  value: Value,
): Success<Value> | Reloading<Value> {
  return succeed(value);
}

export function reloading<Value>(value: Value): Reloading<Value> {
  return succeed(value, true);
}

export function match<Value, A, B, C, E = Error>(
  loadable: Loadable<Value, E>,
  options: {
    success(data: Value, loading: boolean): A;
    failure(error: E, loading: boolean): B;
    pending(loading: boolean): C;
  },
): A | B | C {
  switch (loadable.state) {
    case 'success':
      return options.success(loadable.value, loadable.loading);
    case 'pending':
      return options.pending(loadable.loading);
    case 'failure':
      return options.failure(loadable.error, loadable.loading);
  }
}

export function chain<A, B, E = Error>(
  predicate: (data: A, loading: boolean) => Loadable<B, E>,
): (loadable: Loadable<A, E>) => Loadable<B, E> {
  return (loadable) =>
    loadable.state === 'success'
      ? predicate(loadable.value, loadable.loading)
      : loadable;
}

export function map<A, B>(
  predicate: (data: A, loading: boolean) => B,
): <E = Error>(loadable: Loadable<A, E>) => Loadable<B, E> {
  return chain((value, isLoading) =>
    isLoading
      ? reloading(predicate(value, isLoading))
      : success(predicate(value, isLoading)),
  );
}

export function mapFailure<B, E = Error>(
  predicate: (data: E, loading: boolean) => B,
): <A>(loadable: Loadable<A, E>) => Loadable<A, B> {
  return (loadable) =>
    loadable.state === 'failure'
      ? loadable.loading
        ? failure(predicate(loadable.error, loadable.loading))
        : retrying(predicate(loadable.error, loadable.loading))
      : loadable;
}

export function getOrElse<T, E = Error>(
  onPending: () => T,
  onFailure?: (error: E) => T,
): (loadable: Loadable<T, E>) => T {
  return (loadable) =>
    match(loadable, {
      success: (data) => data,
      pending: onPending,
      failure: onFailure || onPending,
    });
}

export function getOrElseW<U, E = Error>(
  onPending: () => U,
  onFailure?: (error: E) => U,
): <T>(loadable: Loadable<T, E>) => T | U {
  return (loadable) =>
    match(loadable, {
      success: (data) => data,
      pending: onPending,
      failure: onFailure || onPending,
    });
}

export function toLoading<Value, E>(
  value: Loadable<Value, E>,
): Loadable<Value, E> {
  return match(value, {
    success: (data) => reloading(data),
    pending: () => makeLoading(),
    failure: (error) => retrying(error),
  });
}

export interface Mutations<Value, E = Error> {
  success: (data: Value) => void;
  failure: (error: E) => void;
  loading: () => void;
  pending: () => void;
}

export function buildMutations<Value, E = Error>(
  dispatchActionSetter: (
    actionSetter: (loadable: Loadable<Value, E>) => Loadable<Value, E>,
  ) => void,
): Mutations<Value, E> {
  return {
    success: (data: Value) => dispatchActionSetter(() => success(data)),
    failure: (error: E) => dispatchActionSetter(() => failure(error)),
    loading: () => dispatchActionSetter(toLoading),
    pending: () => dispatchActionSetter(pending),
  };
}

export function accept<Value, E = Error>(
  mutations: Mutations<Value, E>,
  promise: Promise<Value>,
): void {
  mutations.loading();
  promise.then(mutations.success, mutations.failure);
}
