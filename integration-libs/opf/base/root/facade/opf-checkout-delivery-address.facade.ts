/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { CheckoutDeliveryAddressFacade } from '@spartacus/checkout/base/root';
import { facadeFactory } from '@spartacus/core';
import { OPF_BASE_FEATURE } from '../feature-name';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: OpfCheckoutDeliveryAddressFacade,
      feature: OPF_BASE_FEATURE,
      methods: [
        'getDeliveryAddressState',
        'createAndSetAddress',
        'setDeliveryAddress',
        'clearCheckoutDeliveryAddress',
      ],
      // TODO:#deprecation-checkout - remove once we remove ngrx
      async: true,
    }),
})
export abstract class OpfCheckoutDeliveryAddressFacade extends CheckoutDeliveryAddressFacade {}
