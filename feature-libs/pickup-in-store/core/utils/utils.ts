/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { PointOfServiceStock, Stock } from '@spartacus/core';

export function isInStock(stockInfo: Stock | undefined): boolean {
  return (
    !!stockInfo &&
    stockInfo.stockLevelStatus !== 'outOfStock' &&
    stockInfo.stockLevelStatus !== 'lowStock'
  );
}

export function storeHasStock({ stockInfo }: PointOfServiceStock): boolean {
  return isInStock(stockInfo);
}

export const getProperty = (
  o: Record<string, any> | undefined | null,
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
