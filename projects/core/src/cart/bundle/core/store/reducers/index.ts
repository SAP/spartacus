import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { InjectionToken, Provider } from '@angular/core';
import { BundleState, BUNDLE_DATA } from '../bundle-state';
import { bundleReducer } from './bundle.reducer';
import { StateUtils } from 'projects/core/src/state/utils';

export function getReducers(): ActionReducerMap<BundleState> {
  return {
    bundles: StateUtils.loaderReducer(BUNDLE_DATA, bundleReducer),
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
