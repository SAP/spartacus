/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ActiveCartFacade, EntryGroup } from '@spartacus/cart/base/root';
import {
  GlobalMessageService,
  RoutingService,
  SearchConfig,
  UserIdService,
  WindowRef,
} from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BundleStarter, BundleTypes } from '../model/bundle.model';
import {
  AvailableEntriesEntities,
  BundleActions,
  BundleSelectors,
  StateWithBundle,
} from '../store';

@Injectable({
  providedIn: 'root',
})
export class BundleService {
  constructor(
    protected store: Store<StateWithBundle>,
    protected winRef: WindowRef,
    protected globalMessageService: GlobalMessageService,
    protected routingService: RoutingService,
    protected activeCartService: ActiveCartFacade,
    protected userIdService: UserIdService,
    @Inject(PLATFORM_ID) protected platformId?: any
  ) {}

  /**
   * Returns boolean observable for store's loading state
   */
  getAvailableEntriesLoading(): Observable<boolean> {
    return this.store.pipe(select(BundleSelectors.getAvailableEntriesLoading));
  }

  /**
   * Returns boolean observable for store's success state
   */
  getAvailableEntriesLoaded(): Observable<boolean> {
    return this.store.pipe(select(BundleSelectors.getAvailableEntriesSuccess));
  }

  /**
   * Returns observable for store's entities
   */
  getAvailableEntriesEntities(): Observable<AvailableEntriesEntities> {
    return this.store.pipe(
      select(BundleSelectors.getAvailableEntriesEntities),
      map((data) => {
        return data.availableEntriesEntities;
      })
    );
  }

  /**
   * Start bundle
   *
   * @param cartId
   * @param userId
   * @param productCode
   * @param quantity
   * @param templateId
   */
  startBundle(cartId: string, userId: string, bundleStarter: BundleStarter) {
    this.store.dispatch(
      new BundleActions.StartBundle({
        cartId,
        userId,
        bundleStarter,
      })
    );
  }

  getAllowedProducts(
    entryGroupNumber: number,
    query?: string,
    searchConfig?: SearchConfig
  ) {
    if (entryGroupNumber) {
      combineLatest([
        this.activeCartService.getActiveCartId(),
        this.userIdService.getUserId(),
      ]).subscribe(([cartId, userId]) => {
        if (cartId && userId) {
          this.getBundleAllowedProducts(
            cartId,
            userId,
            entryGroupNumber,
            query,
            searchConfig
          );
        }
      });
    }
  }

  /**
   * Start bundle
   *
   * @param cartId
   * @param userId
   * @param entryGroupNumber
   */
  getBundleAllowedProducts(
    cartId: string,
    userId: string,
    entryGroupNumber: number,
    query?: string,
    searchConfig?: SearchConfig
  ) {
    this.store.dispatch(
      new BundleActions.GetBundleAllowedProducts({
        cartId,
        userId,
        query,
        entryGroupNumber,
        searchConfig,
      })
    );
  }

  /**
   * Check if given entry group is a bundle
   *
   * @param entryGroup
   */
  isBundle(entryGroup: EntryGroup): boolean {
    return (
      Boolean(entryGroup.type) &&
      Object.values(BundleTypes).includes(entryGroup.type as BundleTypes)
    );
  }
}
