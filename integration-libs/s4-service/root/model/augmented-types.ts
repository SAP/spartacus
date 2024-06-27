/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import '@spartacus/checkout/base/root';
import '@spartacus/core';
import { ServiceDetails } from './checkout-service-details.model';

declare module '@spartacus/checkout/base/root' {
  const enum CheckoutStepType {
    SERVICE_DETAILS = 'serviceDetails',
  }
  interface CheckoutState {
    scheduledAt?: ServiceDetails;
  }
}
export abstract class serviceOrderConfiguration {
  serviceOrderConfiguration?: {
    leadDays?: number;
    serviceScheduleTimes?: string[];
  };
}

declare module '@spartacus/core' {
  interface BaseStore extends serviceOrderConfiguration {}
}

// adding config from integration-libs/s4-service/occ/model/occ-service-order-checkout-endpoints.model.ts
import { OccEndpoint } from '@spartacus/core';

export interface CheckoutServiceOrderOccEndpoints {
  /**
   * Sets the service details for the checkout cart
   */
  setServiceScheduleSlot?: string | OccEndpoint;
}

declare module '@spartacus/core' {
  interface OccEndpoints extends CheckoutServiceOrderOccEndpoints {}
}
