/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
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

export const insertItemAtIndex = <T>(item: T, index: number, array: T[]) => {
  return [...array.slice(0, index), item, ...array.slice(index)];
};

export const removeItemAtIndex = <T>(index: number, array: T[]) => {
  return [...array.slice(0, index), ...array.slice(index + 1)];
};
