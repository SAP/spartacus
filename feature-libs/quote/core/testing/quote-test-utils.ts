/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Quote, QuoteState } from '@spartacus/quote/root';

/**
 * Quote test utils.
 */
export const QUOTE_CODE = '00010000';
export const EXPIRATION_TIME_AS_STRING = '2023-08-26T09:13:00+02:00';
export const EXPIRATION_DATE_AS_STRING = '2023-08-26';
export function createEmptyQuote(): Quote {
  return {
    code: QUOTE_CODE,
    name: 'Quote',
    state: QuoteState.BUYER_DRAFT,
    allowedActions: [],
    totalPrice: {},
    description: 'Quote description',
    isEditable: true,
  };
}
