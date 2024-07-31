/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccConfig } from '@spartacus/core';

export const defaultOccOpfConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        verifyPayment: 'payments/${paymentSessionId}/verify',
        submitPayment: 'payments/${paymentSessionId}/submit',
        submitCompletePayment: 'payments/${paymentSessionId}/submit-complete',
        afterRedirectScripts:
          'payments/${paymentSessionId}/after-redirect-scripts',
        getActiveConfigurations: 'active-configurations',
        getCtaScripts: 'payments/cta-scripts-rendering',
        getApplePayWebSession: 'payments/apple-pay-web-sessions',
      },
    },
  },
};
