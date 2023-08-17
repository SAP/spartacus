/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';
import { CheckoutFlow } from '../model/checkout-flow.model';

export enum DeliveryModePreferences {
  FREE = 'FREE',
  LEAST_EXPENSIVE = 'LEAST_EXPENSIVE', // but not free
  MOST_EXPENSIVE = 'MOST_EXPENSIVE',
}

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class CheckoutConfig {
  checkout?: CheckoutFlow[];
}

declare module '@spartacus/core' {
  interface Config extends CheckoutConfig {}
}
