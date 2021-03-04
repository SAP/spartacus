import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { InjectionToken, Provider } from '@angular/core';
import { BundleState, BUNDLE_DATA } from '../bundle-state';
import { StateUtils } from '@spartacus/core';
import { bundleReducer } from './bundle.reducer';

export function getReducers(): ActionReducerMap<BundleState> {
  return {
    findStores: StateUtils.loaderReducer(BUNDLE_DATA, bundleReducer),
  };
}

export const reducerToken: InjectionToken<ActionReducerMap<
  BundleState
>> = new InjectionToken<ActionReducerMap<BundleState>>('BundleReducers');

export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers,
};

export const metaReducers: MetaReducer<any>[] = [];
