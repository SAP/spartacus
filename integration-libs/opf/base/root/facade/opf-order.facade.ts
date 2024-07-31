/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { Order } from '@spartacus/order/root';
import { Observable } from 'rxjs';
import { OPF_BASE_FEATURE } from '../feature-name';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: OpfOrderFacade,
      feature: OPF_BASE_FEATURE,
      methods: ['placeOpfOrder'],
    }),
})
export abstract class OpfOrderFacade {
  /**
   * Places an order
   */
  abstract placeOpfOrder(termsChecked: boolean): Observable<Order>;
}
