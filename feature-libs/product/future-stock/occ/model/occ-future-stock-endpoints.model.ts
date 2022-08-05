import { OccEndpoint } from '@spartacus/core';

export interface FutureStockOccEndpoints {
  /**
   * Get a specific future stock.
   */
  getFutureStock?: string | OccEndpoint;
  /**
   * Get all future stocks.
   */
  getFutureStocks?: string | OccEndpoint;
}

declare module '@spartacus/core' {
  interface OccEndpoints extends FutureStockOccEndpoints {}
}
