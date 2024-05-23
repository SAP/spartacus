/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccEndpoint } from '@spartacus/core';

export interface QuoteOccEndpoints {
  /**
   * Get all quotes for user.
   */
  getQuotes?: string | OccEndpoint;

  /**
   * Request a quote.
   */
  createQuote?: string | OccEndpoint;

  /**
   * Get a specific quote.
   */
  getQuote?: string | OccEndpoint;

  /**
   * Edit the quote.
   */
  editQuote?: string | OccEndpoint;

  /**
   * Perform workflow actions with the quote.
   */
  performQuoteAction?: string | OccEndpoint;

  /**
   * Add a comment to a quote.
   */
  addComment?: string | OccEndpoint;

  /**
   * Apply a discount to an existing quote.
   */
  addDiscount?: string | OccEndpoint;

  /**
   * Add a comment to a line item of a quote.
   */
  addQuoteEntryComment?: string | OccEndpoint;

  /**
   * Downloads the proposal document associated with a quote.
   */
  downloadAttachment?: string | OccEndpoint;
}

declare module '@spartacus/core' {
  interface OccEndpoints extends QuoteOccEndpoints {}
}
