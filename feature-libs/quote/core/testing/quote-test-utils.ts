/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Quote } from '@spartacus/quote/root';

/**
 * Quote test utils
 */
export const QUOTE_CODE = '00010000';
export function createEmptyQuote(): Quote {
  return {
    code: QUOTE_CODE,
    name: 'Quote',
    allowedActions: [],
    totalPrice: {},
    comments: [],
    description: 'Quote description',
    isEditable: true,
  };
}
