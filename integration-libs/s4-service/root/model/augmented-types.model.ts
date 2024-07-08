/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import '@spartacus/checkout/base/root';
import '@spartacus/core';
import { OccEndpoint } from '@spartacus/core';
import '@spartacus/order/root';
import { ServiceTime } from './checkout-service-details.model';

declare module '@spartacus/order/root' {
  interface Order {
    servicedAt?: ServiceTime;
  }
}

declare module '@spartacus/checkout/base/root' {
  const enum CheckoutStepType {
    SERVICE_DETAILS = 'serviceDetails',
  }
  interface CheckoutState {
    servicedAt?: ServiceTime; //response property name
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

export interface CheckoutServiceOrderOccEndpoints {
  /**
   * Sets the service details for the checkout cart
   */
  setServiceScheduleSlot?: string | OccEndpoint;
}

declare module '@spartacus/core' {
  interface OccEndpoints extends CheckoutServiceOrderOccEndpoints {}
}

declare module '@spartacus/core' {
  interface Product {
    productTypes?: string;
  }
}
