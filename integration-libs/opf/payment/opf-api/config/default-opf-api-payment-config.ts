/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpfApiConfig } from '@spartacus/opf/base/root';

export const defaultOpfApiPaymentConfig: OpfApiConfig = {
  backend: {
    opfApi: {
      endpoints: {
        verifyPayment: 'payments/${paymentSessionId}/verify',
        submitPayment: 'payments/${paymentSessionId}/submit',
        submitCompletePayment: 'payments/${paymentSessionId}/submit-complete',
        afterRedirectScripts:
          'payments/${paymentSessionId}/after-redirect-scripts',
        initiatePayment: 'payments',
      },
    },
  },
};
