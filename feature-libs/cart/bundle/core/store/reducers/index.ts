import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { InjectionToken, Provider } from '@angular/core';
import { BundlesState, BUNDLE_DATA } from '../bundle-state';
import { StateUtils } from '@spartacus/core';
import { selectedProductsReducer } from './selected-products.reducer';
import { availableEntriesReducer } from './available-entries.reducer';

export function getReducers(): ActionReducerMap<BundlesState, any> {
  return {
    availableEntries: StateUtils.loaderReducer<any, any>(
      BUNDLE_DATA,
      availableEntriesReducer
    ),
    selectedProducts: StateUtils.loaderReducer<any, any>(
      BUNDLE_DATA,
      selectedProductsReducer
    ),
  };
}

export const reducerToken: InjectionToken<ActionReducerMap<BundlesState>> =
  new InjectionToken<ActionReducerMap<BundlesState>>('BundleReducers');

export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers,
};

export const metaReducers: MetaReducer<any>[] = [];
