/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { CartType } from '@spartacus/cart/base/root';
import {
  BASE_SITE_CONTEXT_ID,
  SiteContextParamsService,
  StatePersistenceService,
  StorageSyncType,
} from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { distinctUntilKeyChanged, filter, map } from 'rxjs/operators';
import { CartActions, MultiCartSelectors } from '../store';
import { StateWithMultiCart } from '../store/multi-cart-state';

@Injectable({
  providedIn: 'root',
})
export class MultiCartStatePersistenceService implements OnDestroy {
  protected subscription = new Subscription();

  constructor(
    protected statePersistenceService: StatePersistenceService,
    protected store: Store<StateWithMultiCart>,
    protected siteContextParamsService: SiteContextParamsService
  ) {}

  public initSync() {
    this.subscription.add(
      this.statePersistenceService.syncWithStorage({
        key: 'cart',
        state$: this.getCartState(),
        context$: this.siteContextParamsService.getValues([
          BASE_SITE_CONTEXT_ID,
        ]),
        storageType: StorageSyncType.LOCAL_STORAGE,
        onRead: (state) => this.onRead(state),
      })
    );
  }

  protected getCartState(): Observable<{ active: string }> {
    return this.store.pipe(
      // Since getCartState() may be called while the module is lazy loded
      // The cart state slice may not exist yet in the first store emissions.
      filter((store) => !!store.cart),
      select(MultiCartSelectors.getMultiCartState),
      filter((state) => !!state),
      map((state) => state.index),
      distinctUntilKeyChanged('Active'),
      map((indexState) => {
        return {
          active: indexState[CartType.ACTIVE] ?? '',
        };
      })
    );
  }

  protected onRead(state: { active: string } | undefined) {
    this.store.dispatch(new CartActions.ClearCartState());
    if (state) {
      this.store.dispatch(new CartActions.SetActiveCartId(state.active));
    } else {
      this.store.dispatch(new CartActions.SetActiveCartId(''));
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
