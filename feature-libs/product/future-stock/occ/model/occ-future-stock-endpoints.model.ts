/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccEndpoint } from '@spartacus/core';

export interface FutureStockOccEndpoints {
  /**
   * Get a specific future stock.
   */
  futureStock?: string | OccEndpoint;
  /**
   * Get all future stocks.
   */
  futureStocks?: string | OccEndpoint;
}

declare module '@spartacus/core' {
  interface OccEndpoints extends FutureStockOccEndpoints {}
}
