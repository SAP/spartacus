/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
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
