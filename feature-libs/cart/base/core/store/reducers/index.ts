/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken, Provider } from '@angular/core';
import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { Cart } from '@spartacus/cart/base/root';
import { AuthActions, StateUtils } from '@spartacus/core';
import { MultiCartState, MULTI_CART_DATA } from '../multi-cart-state';
import {
  cartEntitiesReducer,
  cartTypeIndexReducer,
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
