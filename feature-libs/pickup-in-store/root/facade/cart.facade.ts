/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { PICKUP_IN_STORE_CORE_FEATURE } from '../feature-name';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: CartFacade,
      feature: PICKUP_IN_STORE_CORE_FEATURE,
      methods: ['getPickupOption'],
      async: true,
    }),
})
export abstract class CartFacade {
  abstract getPickupOption(productCode: string): void;
}
