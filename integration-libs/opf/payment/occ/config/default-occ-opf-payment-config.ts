/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccConfig } from '@spartacus/core';

export const defaultOccOpfPaymentConfig: OccConfig = {
  backend: {
    occ: {
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
