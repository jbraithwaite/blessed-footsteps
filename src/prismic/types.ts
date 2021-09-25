import * as t from 'io-ts';
import { Elements } from 'prismic-reactjs';
import { optional, type } from 'types/utils';

export const baseSlice = {
  slice_type: t.string,
  slice_label: t.union([t.string, t.null]),
};

export const elements = t.keyof({
  [Elements.heading1]: null,
  [Elements.heading2]: null,
  [Elements.heading3]: null,
  [Elements.heading4]: null,
  [Elements.heading5]: null,
  [Elements.heading6]: null,
  [Elements.paragraph]: null,
  [Elements.preformatted]: null,
  [Elements.strong]: null,
  [Elements.em]: null,
  [Elements.listItem]: null,
  [Elements.oListItem]: null,
  [Elements.list]: null,
  [Elements.oList]: null,
  [Elements.image]: null,
  [Elements.embed]: null,
  [Elements.hyperlink]: null,
  [Elements.label]: null,
  [Elements.span]: null,
});

export type Hyperlink = t.TypeOf<typeof hyperlink>;
export const hyperlink = type({
  link_type: optional(
    t.keyof({
      Web: null,
      Document: null,
      Media: null,
      Any: null,
    }),
  ),
  url: optional(t.string),
  target: optional(t.string),
  id: optional(t.string),
  uid: optional(t.string),
  isBroken: optional(t.boolean),
  lang: optional(t.string),
  slug: optional(t.string),
  tags: optional(t.array(t.string)),
  type: optional(t.string),
  height: optional(t.string),
  kind: optional(t.string),
  name: optional(t.string),
  size: optional(t.string),
  width: optional(t.string),
});

export const richTextSpan = type({
  start: t.number,
  end: t.number,
  type: t.keyof({
    [Elements.strong]: null,
    [Elements.hyperlink]: null,
    [Elements.em]: null,
    [Elements.label]: null,
  }),
  // text: t.string,
  data: optional(
    t.intersection([hyperlink, type({ label: optional(t.string) })]),
  ),
});

export type RichTextBlock = t.TypeOf<typeof richTextBlock>;
export const richTextBlock = t.array(
  type({
    type: elements,
    text: optional(t.string),
    spans: optional(t.array(richTextSpan)),
    alt: optional(t.union([t.string, t.null])),
    copyright: optional(t.union([t.string, t.null])),
    dimensions: optional(type({ width: t.number, height: t.number })),
    url: optional(t.string),
    linkTo: optional(hyperlink),
    oembed: optional(t.unknown),
  }),
);

export type Image = t.TypeOf<typeof image>;
export const image = type({
  url: t.string,
  alt: optional(t.string),
  copyright: optional(t.string),
  dimensions: type({ width: t.number, height: t.number }),
});

export type Headings = t.TypeOf<typeof headings>;
export const headings = t.keyof({
  [Elements.heading1]: null,
  [Elements.heading2]: null,
  [Elements.heading3]: null,
  [Elements.heading4]: null,
  [Elements.heading5]: null,
  [Elements.heading6]: null,
});

export type TitleBlock = t.TypeOf<typeof titleBlock>;
export const titleBlock = t.array(
  type({
    type: headings,
    text: t.string,
  }),
);

export const label = t.union([t.string, t.null]);

export type Doc = t.TypeOf<typeof doc>;
export const doc = type({
  id: t.string,
  uid: t.string,
  type: t.string,
  data: t.UnknownRecord,
});
