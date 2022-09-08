export const constVoid = (): void => {};
export const constUndefined = (): undefined => undefined;

export function defined<T>(value: T | undefined): value is T {
  return value !== undefined;
}

export function pluck<Key extends keyof any>(
  key: Key,
): <Value>(obj: Record<Key, Value>) => Value {
  return (obj) => obj[key];
}

export function optionalPluck<Key extends keyof any>(
  key: Key,
): <Value>(value: Partial<Record<Key, Value>>) => Value | undefined {
  return (value) => value[key];
}
