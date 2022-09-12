/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccEndpoint } from '@commerce-storefront-toolset/core';

export interface DigitalPaymentsOccEndpoints {
  paymentRequest?: string | OccEndpoint;
  paymentDetails?: string | OccEndpoint;
}
declare module '@commerce-storefront-toolset/core' {
  interface OccEndpoints extends DigitalPaymentsOccEndpoints {}
}
