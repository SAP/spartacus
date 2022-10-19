/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  ConsentService,
  PointOfServiceStock,
  User,
  UserIdService,
  WindowRef,
} from '@spartacus/core';
import {
  PickRequiredDeep,
  PickupLocationsSearchFacade,
  PREFERRED_STORE_LOCAL_STORAGE_KEY,
} from '@spartacus/pickup-in-store/root';
import { UserProfileFacade } from '@spartacus/user/profile/root';
import { Observable, of, iif } from 'rxjs';
import { filter, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { PickupInStoreConfig } from '../config';
import { StateWithPickupLocations } from '../store';
import {
  LoadDefaultPointOfService,
  SetDefaultPointOfService,
} from '../store/actions/default-point-of-service-name.action';
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
  // private _getPreferredStore$ = new BehaviorSubject<
  //   PointOfServiceNames | undefined
  // >(this.getPreferredStoreFromLocalStorage());

  constructor(
    protected config: PickupInStoreConfig,
    protected consentService: ConsentService,
    protected pickupLocationsSearchService: PickupLocationsSearchFacade,
    protected winRef: WindowRef,
    protected userProfileService: UserProfileFacade,
    protected userIdService: UserIdService,
    protected store: Store<StateWithPickupLocations>
  ) {
    // Intentional empty constructor
  }

  /**
   * Gets the user's preferred store for Pickup in Store.
   * @returns the preferred store from local storage
   */
  getPreferredStore$(): Observable<PointOfServiceNames | undefined> {
    this.store.dispatch(LoadDefaultPointOfService());
    return this.getPreferredStoreFromUserProfileService().pipe(
      mergeMap((preferredStore: User | undefined) =>
        iif(
          () => !!preferredStore && !!preferredStore?.defaultPointOfServiceName,
          of({
            name: preferredStore?.defaultPointOfServiceName as string,
            displayName: preferredStore?.defaultPointOfServiceName as string,
          }),
          of(this.getPreferredStoreFromLocalStorage())
        )
      )
    );
  }
  /**
   *
   * @returns  Observable<User | undefined>
   */
  getPreferredStoreFromUserProfileService(): Observable<User | undefined> {
    return this.userProfileService.get();
  }

  /**
   *
   * @returns  Observable<User | undefined>
   */
  getPreferredStoreFromLocalStorage(): PointOfServiceNames | undefined {
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
    console.log('setPreferredStore');
    this.store.dispatch(SetDefaultPointOfService({ payload: preferredStore }));
    // this.consentService
    //   .checkConsentGivenByTemplateId(
    //     this.config.pickupInStore?.consentTemplateId ?? ''
    //   )
    //   .pipe(
    //     take(1),
    //     filter((consentGiven) => consentGiven),
    //     tap(() =>
    //       this.winRef.localStorage?.setItem(
    //         PREFERRED_STORE_LOCAL_STORAGE_KEY,
    //         JSON.stringify(preferredStore)
    //       )
    //     ),
    //     // tap(() => this._getPreferredStore$.next(preferredStore)),
    //     mergeMap(() => this.userIdService.getUserId()),
    //     filter((userId) => userId !== 'anonymous'),
    //     tap(() => console.log('perform Update')),
    //     mergeMap(() =>
    //       this.userProfileService.update({
    //         defaultPointOfServiceName: preferredStore.name,
    //       })
    //     )
    //   )
    //   .subscribe();
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
