/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import type { OccEndpoint as CoreOccEndpoint } from '@spartacus/core';

export interface QuoteOccEndpoints {
  /**
   * Get all quotes for user.
   */
  getQuotes?: string | CoreOccEndpoint;

  /**
   * Request a quote.
   */
  createQuote?: string | CoreOccEndpoint;

  /**
   * Get Order Code associated with the Quote. The Order Code is present if the quote was used to place an order.
   */
  getOrderCode?: string | CoreOccEndpoint;

  /**
   * Get a specific quote.
   */
  getQuote?: string | CoreOccEndpoint;

  /**
   * Edit the quote.
   */
  editQuote?: string | CoreOccEndpoint;

  /**
   * Perform workflow actions with the quote.
   */
  performQuoteAction?: string | CoreOccEndpoint;

  /**
   * Add a comment to a quote.
   */
  addComment?: string | CoreOccEndpoint;

  /**
   * Apply a discount to an existing quote.
   */
  addDiscount?: string | CoreOccEndpoint;

  /**
   * Add a comment to a line item of a quote.
   */
  addQuoteEntryComment?: string | CoreOccEndpoint;

  /**
   * Downloads the proposal document associated with a quote.
   */
  downloadAttachment?: string | CoreOccEndpoint;
}

declare module '@spartacus/core' {
  interface OccEndpoints extends QuoteOccEndpoints {}
}
