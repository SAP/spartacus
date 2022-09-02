/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export type RequiredPick<T extends object, K extends keyof T = keyof T> = Omit<
  T,
  K
> &
  Required<Pick<T, K>>;

/**
 * Removes the specified properties from the given object,
 * and returns a new object
 */
// TODO:#xxx - test
export function omitProps<T extends object, K extends keyof T = keyof T>(
  obj: T,
  ...keys: K[]
): Omit<T, K> {
  const result = { ...obj };
  keys.forEach((key) => delete result[key]);
  return result;
}
