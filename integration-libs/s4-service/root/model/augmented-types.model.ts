/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import '@spartacus/checkout/base/root';
import { Config, OccEndpoint } from '@spartacus/core';
import '@spartacus/order/root';
import {
  serviceCancellable,
  ServiceDateTime,
} from './checkout-service-details.model';
import { Injectable } from '@angular/core';
import { DeliveryMode } from '@spartacus/cart/base/root';

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

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class S4ServiceDeliveryModeConfig {
  s4ServiceDeliveryMode?: DeliveryMode;
}

declare module '@spartacus/core' {
  export interface Config extends S4ServiceDeliveryModeConfig {}
}
