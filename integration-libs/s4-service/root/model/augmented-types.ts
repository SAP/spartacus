/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import '@spartacus/checkout/base/root';
import { serviceDetails } from './checkout-service-details.model';

declare module '@spartacus/checkout/base/root' {
  const enum CheckoutStepType {
    SERVICE_DETAILS = 'serviceDetails',
  }
  interface CheckoutState {
    scheduledAt?: serviceDetails;
  }
}
