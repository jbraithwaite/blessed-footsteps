export function isNonEmpty<T>(array: T[]): array is NonEmptyArray<T> {
  return array.length > 0;
}

export type NonEmptyArray<T> = [T, ...T[]];
