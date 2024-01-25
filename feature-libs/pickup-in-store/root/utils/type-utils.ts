/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Cart } from '@spartacus/cart/base/root';

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
type RequiredDeepArray<T, P extends string[]> = T extends object
  ? Omit<T, Extract<keyof T, P[0]>> & PickRequiredDeepArray<T, P>
  : T;

/**
 * A utility type that takes a base type and a union of arrays of strings that
 * represent the paths to properties on that type. The returned type has only
 * the referenced properties and makes them all required.
 */
type PickRequiredDeepArray<T, P extends string[]> = T extends object
  ? Required<{
      [K in Extract<keyof T, P[0]>]: NonNullable<
        PickRequiredDeepArray<T[K], ShiftUnion<P[0], P>>
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
    type A = RequiredDeepPath<Foo, "a">; // {a: 2, b?: { c?: 3, d: 4 } }
    type B = RequiredDeepPath<Foo, "b">; // {a?: 2, b: { c?: 3, d: 4 } }
    type BC = RequiredDeepPath<Foo, "b.c">; // {a?: 2, b: { c: 3, d: 4 } }
    type ABC = RequiredDeepPath<Foo, "a" | "b.c">; // {a: 2, b: { c: 3, d: 4 } }
 * ```
 */
export type RequiredDeepPath<T, P extends string> = RequiredDeepArray<
  T,
  PathToStringArray<P>
>;

/**
 * A utility type that takes a base type and a union of strings that represent
 * the paths to properties on that type. The returned type has only the
 * referenced properties and makes them all required.
 *
 * @example ```ts
    type Foo = { a?: 2, b?: { c?: 3, d: 4 } }
    type A = PickRequiredDeep<Foo, "a">; // { a: 2 }
    type B = PickRequiredDeep<Foo, "b">; // { b: {} }
    type BC = PickRequiredDeep<Foo, "b.c">; // { b: { c: 3 }}
    type ABC = PickRequiredDeep<Foo, "a" | "b.c">; // { a: 2, b: { c: 3 } }
 * ```
 */
export type PickRequiredDeep<T, P extends string> = PickRequiredDeepArray<
  T,
  PathToStringArray<P>
>;

/** A cart with the ids required for pickup in store */
export type CartWithIdAndUserId = RequiredDeepPath<
  Cart,
  'guid' | 'user.uid' | 'code'
>;
