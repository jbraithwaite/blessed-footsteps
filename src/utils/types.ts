export function defined<T>(value: T | undefined): value is T {
  return value !== undefined;
}

export function pluck<Key extends PropertyKey>(
  key: Key,
): <Value>(obj: Record<Key, Value>) => Value {
  return (obj) => obj[key];
}

export function optionalPluck<Key extends PropertyKey>(
  key: Key,
): <Value>(obj: Partial<Record<Key, Value>>) => Value | undefined {
  return (obj) => obj[key];
}

export function hasProp<Key extends PropertyKey>(
  obj: object,
  prop: Key,
): obj is Record<Key, unknown> {
  return prop in obj;
}

export type Setter<in T> = (value: T) => void;
export type Getter<out T> = () => T;
