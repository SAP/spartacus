/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { WindowRef } from '@spartacus/core';
import {
  PickupLocationsSearchFacade,
  PointOfServiceNames,
  PreferredStoreFacade,
  PREFERRED_STORE_LOCAL_STORAGE_KEY,
} from '@spartacus/pickup-in-store/root';
import { Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { PickupInStoreConfig } from '../config';
import {
  DefaultPointOfServiceSelectors,
  StateWithPickupLocations,
} from '../store';
import {
  LoadDefaultPointOfService,
  SetDefaultPointOfService,
} from '../store/actions/default-point-of-service-name.action';
import { isInStock } from '../utils';

/**
 * Service to store the user's preferred store for Pickup in Store in local storage.
 */
@Injectable()
export class PreferredStoreService implements PreferredStoreFacade {
  constructor(
    protected config: PickupInStoreConfig,
    protected pickupLocationsSearchService: PickupLocationsSearchFacade,
    protected winRef: WindowRef,
    protected store: Store<StateWithPickupLocations>
  ) {
    this.store.dispatch(LoadDefaultPointOfService());
  }

  /**
   * Gets the user's preferred store for Pickup in Store.
   * @returns the preferred store from the store
   */
  getPreferredStore$(): Observable<PointOfServiceNames | null> {
    return this.store.pipe(
      select(DefaultPointOfServiceSelectors.getPreferredStore)
    );
  }

  /**
   * Sets the user's preferred store for Pickup in Store.
   * @param preferredStore the preferred store to set
   */
  setPreferredStore(preferredStore: PointOfServiceNames): void {
    this.store.dispatch(SetDefaultPointOfService({ payload: preferredStore }));
  }

  /**
   * Clears the user's preferred store for Pickup in Store.
   */
  clearPreferredStore(): void {
    this.winRef.localStorage?.removeItem(PREFERRED_STORE_LOCAL_STORAGE_KEY);
  }

  /**
   * Get the user's preferred store from local storage and only return it if it
   * has stock for the given product.
   * @param productCode The product code to check the stock level of
   */
  getPreferredStoreWithProductInStock(
    productCode: string
  ): Observable<PointOfServiceNames> {
    return this.getPreferredStore$().pipe(
      filter((store): store is PointOfServiceNames => !!store),
      tap((preferredStore) => {
        this.pickupLocationsSearchService.stockLevelAtStore(
          productCode,
          preferredStore.name
        );
      }),
      switchMap((store) =>
        this.pickupLocationsSearchService
          .getStockLevelAtStore(productCode, store.name)
          .pipe(
            filter(isInStock),
            map((_) => store),
            tap((preferredStore) => ({
              name: preferredStore.name,
              displayName: preferredStore.name,
            }))
          )
      )
    );
  }
}
