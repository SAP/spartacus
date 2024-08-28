/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import '@spartacus/checkout/base/root';
import { OccEndpoint } from '@spartacus/core';
import '@spartacus/order/root';
import {
  serviceCancellable,
  ServiceDateTime,
} from './checkout-service-details.model';

export abstract class ServiceOrderConfiguration {
  serviceOrderConfiguration?: {
    leadDays?: number;
    serviceScheduleTimes?: string[];
  };
}

export interface CheckoutServiceOrderOccEndpoints {
  /**
   * Sets the service details for the checkout cart
   */
  setServiceScheduleSlot?: string | OccEndpoint;
}

declare module '@spartacus/order/root' {
  interface Order {
    servicedAt?: ServiceDateTime;
    serviceCancellable?: serviceCancellable;
    serviceReschedulable?: boolean;
  }
}

declare module '@spartacus/checkout/base/root' {
  const enum CheckoutStepType {
    SERVICE_DETAILS = 'serviceDetails',
  }
  interface CheckoutState {
    servicedAt?: ServiceDateTime; //response property name
  }
}

declare module '@spartacus/core' {
  interface OccEndpoints extends CheckoutServiceOrderOccEndpoints {}
  interface BaseStore extends ServiceOrderConfiguration {}
  interface Product {
    productTypes?: string;
  }
}
