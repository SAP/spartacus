/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccConfig, Config } from '@spartacus/core';
import { DigitalPaymentsOccEndpoints } from './index';
import { Injectable } from '@angular/core';

const occDigitalPaymentsEndpoints: DigitalPaymentsOccEndpoints = {
  paymentRequest:
    'users/${userId}/carts/${cartId}/payment/digitalPayments/request',
  paymentDetails:
    'users/${userId}/carts/${cartId}/payment/digitalPayments/response',
};
export const occDigitalPaymentsConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        ...occDigitalPaymentsEndpoints,
      },
    },
  },
};

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class DigitalPaymentsConfig {
  digitalPayments?: {
    occQueryParams?: {
      sessionId?: string;
      signature?: string;
      billingAddress?: string;
      country?: string;
      firstName?: string;
      lastName?: string;
      line1?: string;
      line2?: string;
      town?: string;
      region?: string;
      postalCode?: string;
    };
  };
}

declare module '@spartacus/core' {
  interface Config extends DigitalPaymentsConfig {}
}
