export function defined<T>(value: T | undefined): value is T {
  return value !== undefined;
}

export function notNull<T>(value: T | null): value is T {
  return value !== null;
}

export function noop(): void {
  return undefined;
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

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
 */
export type AutoComplete = 'given-name' | 'family-name' | 'email';

type GlobalAllowList = 'title';

export type HTMLProps<
  Element extends keyof React.ReactHTML,
  AllowList extends keyof PropsFor<Element>,
> = Pick<PropsFor<Element>, GlobalAllowList | AllowList>;

type PropsFor<Element extends keyof React.ReactHTML> = ReturnType<
  React.ReactHTML[Element]
>['props'];
