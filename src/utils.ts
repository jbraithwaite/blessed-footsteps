export function defined<T>(value: T | undefined): value is T {
  return value !== undefined;
}

export function notNull<T>(value: T | null): value is T {
  return value !== null;
}

export function noop(): void {
  return undefined;
}
