/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export const getProperty = (
  o: Object | undefined | null,
  property: string
): any | null => {
  if (!o) {
    return null;
  }
  if (o.hasOwnProperty(property)) {
    return o[property];
  }
  return null;
};
