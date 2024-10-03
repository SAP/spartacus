/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { Observable } from 'rxjs';
import { PICKUP_IN_STORE_CORE_FEATURE } from '../feature-name';
import { PointOfServiceNames } from '../model/point-of-service-names.model';

/**
 * Service to store the user's preferred store for Pickup in Store in local storage.
 */
@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: PreferredStoreFacade,
      feature: PICKUP_IN_STORE_CORE_FEATURE,
      methods: [
        'getPreferredStore$',
        'getPreferredStoreWithProductInStock',
        'clearPreferredStore',
        'setPreferredStore',
      ],
      async: true,
    }),
})
export abstract class PreferredStoreFacade {
  /**
   * Gets the user's preferred store for Pickup in Store.
   * @returns the preferred store from the store
   */
  abstract getPreferredStore$(): Observable<PointOfServiceNames | null>;

  /**
   * Sets the user's preferred store for Pickup in Store.
   * @param preferredStore the preferred store to set
   */
  abstract setPreferredStore(preferredStore: PointOfServiceNames): void;

  /**
   * Clears the user's preferred store for Pickup in Store.
   */
  abstract clearPreferredStore(): void;

  /**
   * Get the user's preferred store from local storage and only return it if it
   * has stock for the given product.
   * @param productCode The product code to check the stock level of
   */
  abstract getPreferredStoreWithProductInStock(
    productCode: string
  ): Observable<PointOfServiceNames>;
}
