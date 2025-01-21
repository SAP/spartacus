/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpfQuickBuyConfig } from './opf-quick-buy-config';

export const defaultOpfQuickBuyConfig: OpfQuickBuyConfig = {
  providers: {
    googlePay: {
      resourceUrl: 'https://pay.google.com/gp/p/js/pay.js',
    },
  },
};
