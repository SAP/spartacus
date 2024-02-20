/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export const enum ProductScope {
  LIST = 'list',
  DETAILS = 'details',
  ATTRIBUTES = 'attributes',
  VARIANTS = 'variants',
  PRICE = 'price',
  /** Fetch the default stock information. */
  STOCK = 'stock',
  PROMOTIONS = 'promotions',
}
