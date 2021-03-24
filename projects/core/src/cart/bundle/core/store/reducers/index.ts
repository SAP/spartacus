import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { InjectionToken, Provider } from '@angular/core';
import { BundlesState, BUNDLE_DATA } from '../bundle-state';
import { StateUtils } from '../../../../../state/utils';
import { availableEntriesReducer } from './available-entries.reducer';

export function getReducers(): ActionReducerMap<BundlesState> {
  return {
    availableEntries: StateUtils.loaderReducer(BUNDLE_DATA, availableEntriesReducer),
  };
}

export const reducerToken: InjectionToken<ActionReducerMap<
  BundlesState
>> = new InjectionToken<ActionReducerMap<BundlesState>>('BundleReducers');

export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers,
};

export const metaReducers: MetaReducer<any>[] = [];
