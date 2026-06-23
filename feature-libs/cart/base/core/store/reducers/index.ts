/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, InjectionToken, Provider } from '@angular/core';
import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { Cart } from '@spartacus/cart/base/root';
import { AuthActions, FeatureToggles, StateUtils } from '@spartacus/core';
import { MultiCartState, MULTI_CART_DATA } from '../multi-cart-state';
import {
  cartEntitiesReducer,
  cartTypeIndexReducer,
  setCartSlowNetworkResilienceEnabled,
} from './multi-cart.reducer';

export function clearMultiCartState(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return function (state, action) {
    if (action.type === AuthActions.LOGOUT) {
      state = undefined;
    }
    return reducer(state, action);
  };
}

export const multiCartMetaReducers: MetaReducer<any>[] = [clearMultiCartState];

export const multiCartReducerToken: InjectionToken<
  ActionReducerMap<MultiCartState>
> = new InjectionToken<ActionReducerMap<MultiCartState>>('MultiCartReducers');

export function getMultiCartReducers(): ActionReducerMap<MultiCartState, any> {
  // Capture the `enableCartSlowNetworkResilience` toggle at app bootstrap so
  // the pure `cartEntitiesReducer` (which has no DI access) can branch on
  // it without changing its signature. Anything that re-runs this factory
  // (e.g. a test override of FeatureToggles) re-syncs the snapshot.
  // Some tests call this factory eagerly outside an Angular injection
  // context — fall back to OFF (legacy behaviour) in that case so existing
  // specs keep working without forcing every TestBed to provide FeatureToggles.
  let enabled = false;
  try {
    enabled = !!inject(FeatureToggles).enableCartSlowNetworkResilience;
  } catch {
    enabled = false;
  }
  setCartSlowNetworkResilienceEnabled(enabled);
  return {
    carts: StateUtils.entityProcessesLoaderReducer<Cart | undefined>(
      MULTI_CART_DATA,
      cartEntitiesReducer
    ),
    index: cartTypeIndexReducer,
  };
}

export const multiCartReducerProvider: Provider = {
  provide: multiCartReducerToken,
  useFactory: getMultiCartReducers,
};
