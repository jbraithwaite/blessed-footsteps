import {
  Any,
  Props as TypeProps,
  Type,
  type as ioType,
  undefined as undef,
  union,
} from 'io-ts';

/**
 * Wraps the `io-ts` `type` creator, modifying keys to also be optional if
 * the key's value can be set to `undefined` in the wrapped type.
 */
export function type<Props extends TypeProps>(
  props: Props,
): InterfaceTypeWithOptional<Props> {
  return ioType(props) as any;
}

/**
 * A io-ts type that has been optimised to simpler error messages
 * and type information from the language server.
 */
export interface InterfaceTypeWithOptional<Props extends TypeProps>
  extends Type<TypeOfProps<Props>, OutputOfProps<Props>, unknown> {
  readonly props: Props;
  readonly _tag: 'InterfaceType';
}

type TypeOfProps<Data extends Record<string, Any>> = {
  [K in RequiredTypeKeys<Data>]: Data[K]['_A'];
} &
  { [K in OptionalTypeKeys<Data>]?: Data[K]['_A'] };

type OutputOfProps<Data extends Record<string, Any>> = {
  [K in RequiredOutputKeys<Data>]: Data[K]['_O'];
} &
  { [K in OptionalOutputKeys<Data>]?: Data[K]['_O'] };

type RequiredTypeKeys<T extends Record<Key, Any>> = {
  [K in keyof T]: undefined extends T[K]['_A'] ? never : K;
}[keyof T];

type OptionalTypeKeys<T extends Record<Key, Any>> = {
  [K in keyof T]: undefined extends T[K]['_A'] ? K : never;
}[keyof T];

type RequiredOutputKeys<T extends Record<Key, Any>> = {
  [K in keyof T]: undefined extends T[K]['_O'] ? never : K;
}[keyof T];

type OptionalOutputKeys<T extends Record<Key, Any>> = {
  [K in keyof T]: undefined extends T[K]['_O'] ? K : never;
}[keyof T];

/**
 * Given a `Type`, create a new type that also accepts `undefined`.
 *
 * When combined with `type`, this Type will also cause the key to be optional.
 */
export function optional<A, O>(
  t: Type<A, O>,
): OptionalType<A | undefined, O | undefined> {
  return union([t, undef]);
}

export type OptionalType<A, O> = Type<A | undefined, O | undefined>;

/**
 * All allowable object key types.
 */
type Key = string | number | symbol;
