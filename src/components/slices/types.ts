import * as t from 'io-ts';
import { audioSlice } from './Audio';
import { contentSlice } from './Content';
import { headingSlice } from './Heading';
import { quoteSlice } from './Quote';
import { type } from 'types/utils';

export interface SliceProps<T extends KnownSlice> {
  slice: T;
}

export type KnownSlice = t.TypeOf<typeof knownSlice>;
export type UnknownSlice = t.TypeOf<typeof unknownSlice>;
export type Slice = t.TypeOf<typeof slice>;

export const knownSlice = t.union([
  audioSlice,
  contentSlice,
  headingSlice,
  quoteSlice,
]);
export const unknownSlice = type({ slice_type: t.string });
export const slice = t.union([knownSlice, unknownSlice]);

export function isKnownSlice(s: Slice): s is KnownSlice {
  return knownSlice.types.some(
    ({ props }) => props.slice_type.value === s.slice_type,
  );
}
