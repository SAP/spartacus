/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Quote } from '@spartacus/quote/root';

/**
 * Quote test utils
 */

export function createEmptyQuote(): Quote {
  return {
    code: '00010000',
    name: 'Quote',
    allowedActions: [],
    totalPrice: {},
    comments: [],
    description: 'Quote description',
  };
}
