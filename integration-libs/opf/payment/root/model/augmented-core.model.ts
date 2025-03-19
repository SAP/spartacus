/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpfPaymentMethodDetails } from './opf-payment.model';

declare module '@spartacus/core' {
  interface PaymentDetails {
    sapPaymentMethod?: OpfPaymentMethodDetails;
  }
}
