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
