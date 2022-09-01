/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import {
  ConsentService,
  PointOfServiceStock,
  WindowRef,
} from '@spartacus/core';
import {
  PickRequiredDeep,
  PickupLocationsSearchFacade,
  PREFERRED_STORE_LOCAL_STORAGE_KEY,
} from '@spartacus/pickup-in-store/root';
import { Observable, of } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { PickupInStoreConfig } from '../config';
import { isInStock } from '../utils';

export type PointOfServiceNames = PickRequiredDeep<
  PointOfServiceStock,
  'name' | 'displayName'
>;

/**
 * Service to store the user's preferred store for Pickup in Store in local storage.
 */
@Injectable()
export class PreferredStoreService {
  constructor(
    protected readonly consentService: ConsentService,
    protected readonly config: PickupInStoreConfig,
    protected readonly pickupLocationsSearchService: PickupLocationsSearchFacade,
    protected readonly winRef: WindowRef
  ) {
    // Intentional empty constructor
  }

  /**
   * Gets the user's preferred store for Pickup in Store.
   * @returns the preferred store from local storage
   */
  getPreferredStore(): PointOfServiceNames | undefined {
    const preferredStore = this.winRef.localStorage?.getItem(
      PREFERRED_STORE_LOCAL_STORAGE_KEY
    );
    return preferredStore ? JSON.parse(preferredStore) : undefined;
  }

  /**
   * Sets the user's preferred store for Pickup in Store.
   * @param preferredStore the preferred store to set
   */
  setPreferredStore(preferredStore: PointOfServiceNames): void {
    this.consentService
      .checkConsentGivenByTemplateId(
        this.config.pickupInStore?.consentTemplateId ?? ''
      )
      .pipe(
        take(1),
        filter((consentGiven) => consentGiven)
      )
      .subscribe(() => {
        this.winRef.localStorage?.setItem(
          PREFERRED_STORE_LOCAL_STORAGE_KEY,
          JSON.stringify(preferredStore)
        );
      });
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
    return of(this.getPreferredStore()).pipe(
      filter((store): store is PointOfServiceNames => !!store),
      tap((preferredStore) => {
        this.pickupLocationsSearchService.stockLevelAtStore(
          productCode,
          preferredStore.name
        );
      }),
      switchMap((preferredStore) =>
        this.pickupLocationsSearchService
          .getStockLevelAtStore(productCode, preferredStore.name)
          .pipe(
            filter(isInStock),
            map((_) => preferredStore)
          )
      )
    );
  }
}
