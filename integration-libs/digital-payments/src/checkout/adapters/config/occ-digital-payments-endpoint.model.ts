/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccEndpoint } from '@spartacus/core';

export interface DigitalPaymentsOccEndpoints {
  paymentRequest?: string | OccEndpoint;
  paymentDetails?: string | OccEndpoint;
}
declare module '@spartacus/core' {
  interface OccEndpoints extends DigitalPaymentsOccEndpoints {}
}
