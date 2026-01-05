/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DigitalPaymentsConfig } from './occ-digital-payments-endpoint.config';

export const defaultDigitalPaymentsConfig: DigitalPaymentsConfig = {
  digitalPayments: {
    occQueryParams: {
      sessionId: 'sid',
      signature: 'sign',
      billingAddress: 'billingAddress',
      country: 'country',
      firstName: 'firstName',
      lastName: 'lastName',
      line1: 'line1',
      line2: 'line2',
      town: 'town',
      region: 'region',
      postalCode: 'postalCode',
    },
  },
};
