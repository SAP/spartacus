/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { CHECKOUT_CORE_FEATURE } from '@spartacus/checkout/base/root';
import { QueryState, facadeFactory } from '@spartacus/core';
import { Observable } from 'rxjs';
import { ServiceDateTime } from '../model/checkout-service-details.model';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: CheckoutServiceDetailsFacade,
      feature: CHECKOUT_CORE_FEATURE,
      methods: [
        'setServiceScheduleSlot',
        'getSelectedServiceDetailsState',
        'getServiceProducts',
        'hasServiceItems',
        'hasNonServiceItems',
      ],
    }),
})
export abstract class CheckoutServiceDetailsFacade {
  /**
   * Set service schedule DateTime for the cart
   */
  abstract setServiceScheduleSlot(
    scheduledAt: ServiceDateTime
  ): Observable<unknown>;

  /**
   * Get the selected scheduled DateTime
   */
  abstract getSelectedServiceDetailsState(): Observable<
    QueryState<ServiceDateTime | undefined>
  >;

  /**
   * Get the name of products of type SERVICE in the active cart
   */
  abstract getServiceProducts(): Observable<string[]>;

  /**
   * Return whether cart has service products
   */
  abstract hasServiceItems(): Observable<boolean>;

  /**
   * Return whether cart has deliverable physical products
   */
  abstract hasNonServiceItems(): Observable<boolean>;
}
