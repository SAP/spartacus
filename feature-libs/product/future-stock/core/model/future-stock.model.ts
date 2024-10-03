/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { FutureStock } from '@spartacus/core';

export interface ProductFutureStock {
  futureStocks: FutureStock[];
  productCode: string;
}

export interface ProductFutureStockList {
  productFutureStocks: FutureStock[];
}
