/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import '@spartacus/checkout/base/root';
import '@spartacus/core';
import { OccEndpoint } from '@spartacus/core';

declare module '@spartacus/checkout/base/root' {
  const enum CheckoutStepType {
    SERVICE_DETAILS = 'serviceDetails',
  }
  interface CheckoutState {
    servicedAt?: string; //response property name
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
