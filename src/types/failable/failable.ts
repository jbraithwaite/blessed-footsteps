export interface Pending {
  state: 'pending';
}

export interface Failure<E> {
  state: 'failure';
  error: E;
}

export interface Success<Value> {
  state: 'success';
  value: Value;
}

export type Future<Value> = Pending | Success<Value>;
export type Failable<Value, E = Error> = Future<Value> | Failure<E>;

export function pending(): Pending {
  return {
    state: 'pending',
  };
}

export function failure<E>(error: E): Failure<E> {
  return {
    state: 'failure',
    error,
  };
}

export function success<Value>(value: Value): Success<Value> {
  return {
    state: 'success',
    value,
  };
}

export function isSuccess<Value>(
  failable: Failable<Value>,
): failable is Success<Value> {
  return failable.state === 'success';
}

export function successOr<Value>(
  failable: Failable<Value>,
  defaultValue: Value,
): Value {
  return isSuccess(failable) ? failable.value : defaultValue;
}

export function match<Value, E, A, B, C>(
  loadable: Failable<Value, E>,
  options: {
    success(data: Value): A;
    failure(error: E): B;
    pending(): C;
  },
): A | B | C {
  switch (loadable.state) {
    case 'success':
      return options.success(loadable.value);
    case 'pending':
      return options.pending();
    case 'failure':
      return options.failure(loadable.error);
  }
}

export function map<A, B>(
  predicate: (data: A) => B,
): <E = Error>(failable: Failable<A, E>) => Failable<B, E> {
  return (failable) => {
    switch (failable.state) {
      case 'success':
        return success(predicate(failable.value));
      case 'pending':
      case 'failure':
        return failable;
    }
  };
}
