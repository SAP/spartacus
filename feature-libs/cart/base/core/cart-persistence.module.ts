/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { Action, ActionReducer, META_REDUCERS, MetaReducer } from '@ngrx/store';
import { CartType } from '@spartacus/cart/base/root';
import {
  Config,
  ConfigInitializerService,
  MODULE_INITIALIZER,
} from '@spartacus/core';
import { lastValueFrom } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MultiCartStatePersistenceService } from './services/multi-cart-state-persistence.service';

export function cartStatePersistenceFactory(
  cartStatePersistenceService: MultiCartStatePersistenceService,
  configInit: ConfigInitializerService
): () => Promise<Config> {
  return () =>
    lastValueFrom(
      configInit.getStable('context').pipe(
        tap(() => {
          cartStatePersistenceService.initSync();
        })
      )
    );
}

/**
 * Before `MultiCartStatePersistenceService` restores the active cart id `ActiveCartService`
 * will use `current` cart instead of the one saved in browser. This meta reducer
 * sets the value on store initialization to undefined cart which holds active cart loading
 * until the data from storage is restored.
 */
export function uninitializeActiveCartMetaReducerFactory(): MetaReducer<any> {
  const metaReducer =
    (reducer: ActionReducer<any>) => (state: any, action: Action) => {
      const newState = { ...state };
      if (action.type === '@ngrx/store/init') {
        newState.cart = {
          ...newState.cart,
          ...{ index: { [CartType.ACTIVE]: undefined } },
        };
      }
      return reducer(newState, action);
    };
  return metaReducer;
}

/**
 * Complimentary module for cart to store cart id in browser storage.
 * This makes it possible to work on the same anonymous cart even after page refresh.
 */
@NgModule({
  imports: [],
  providers: [
    {
      provide: MODULE_INITIALIZER,
      useFactory: cartStatePersistenceFactory,
      deps: [MultiCartStatePersistenceService, ConfigInitializerService],
      multi: true,
    },
    {
      provide: META_REDUCERS,
      useFactory: uninitializeActiveCartMetaReducerFactory,
      multi: true,
    },
  ],
})
export class CartPersistenceModule {}
