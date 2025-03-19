/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpfApiConfig } from '@spartacus/opf/base/root';

export const defaultOpfApiQuickBuyConfig: OpfApiConfig = {
  backend: {
    opfApi: {
      endpoints: {
        getApplePayWebSession: 'payments/apple-pay-web-sessions',
      },
    },
  },
};
