/** A utility type that represents the type of items in an array without the first item */
type Shift<T extends any[]> = ((...t: T) => any) extends (
  first: any,
  ...rest: infer Rest
) => any
  ? Rest
  : never;

/** A distributed conditional utility type for Shift */
type ShiftUnion<P extends PropertyKey, T extends any[]> = T extends any[]
  ? T[0] extends P
    ? Shift<T>
    : never
  : never;

/**
 * A utility type that takes a base type and a union of arrays of strings that
 * represent the paths to properties on that type. The returned type is the same
 * as the base but with all referenced properties required.
 */
type RequiredDeep<T, P extends string[]> = T extends object
  ? Omit<T, Extract<keyof T, P[0]>> &
      Required<{
        [K in Extract<keyof T, P[0]>]: NonNullable<
          RequiredDeep<T[K], ShiftUnion<P[0], P>>
        >;
      }>
  : T;

/** A utility type that takes a string literal type and splits it are the `.` character */
type PathToStringArray<T extends string> =
  T extends `${infer Head}.${infer Tail}`
    ? [...PathToStringArray<Head>, ...PathToStringArray<Tail>]
    : [T];

/**
 * A utility type that takes a base type and a union of strings that represent
 * the paths to properties on that type. The returned type is the same as the
 * base but with all referenced properties required.
 *
 * @example ```ts
    type Foo = { a?: 2, b?: { c?: 3, d: 4 } }
    type A = RequireKeysDeep<Foo, "a">; // {a: 2, b?: { c?: 3, d: 4 } }
    type B = RequireKeysDeep<Foo, "b">; // {a?: 2, b: { c?: 3, d: 4 } }
    type BC = RequireKeysDeep<Foo, "b.c">; // {a?: 2, b: { c: 3, d: 4 } }
    type ABC = RequireKeysDeep<Foo, "a" | "b.c">; // {a: 2, b: { c: 3, d: 4 } }
 * ```
 */
export type PickRequiredDeep<T, P extends string> = RequiredDeep<
  T,
  PathToStringArray<P>
>;
