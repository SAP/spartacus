import {
  Action,
  ActionReducer,
  ActionReducerMap,
  MetaReducer,
} from '@ngrx/store';

import { InjectionToken, Provider } from '@angular/core';
import { StoresState, STORE_FINDER_DATA } from '../store-finder-state';
import { SiteContextActions, StateUtils } from '@spartacus/core';
import { OrganizationState } from '@spartacus/organization/administration/core';
import { StoreFinderActions } from '../actions';

export function getReducers(): ActionReducerMap<StoresState> {
  return {
    findStores: StateUtils.loaderReducer(STORE_FINDER_DATA),
    viewAllStores: StateUtils.loaderReducer(STORE_FINDER_DATA),
  };
}

export const reducerToken: InjectionToken<ActionReducerMap<
  StoresState
>> = new InjectionToken<ActionReducerMap<StoresState>>('StoreFinderReducers');

export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers,
};

export function clearStoreFinderState(
  reducer: ActionReducer<OrganizationState, Action>
): ActionReducer<OrganizationState, Action> {
  return function (state, action) {
    if (action.type === SiteContextActions.LANGUAGE_CHANGE) {
      state = undefined;
    }
    if (action.type === StoreFinderActions.CLEAR_STORE_FINDER_DATA) {
      state = undefined;
    }
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [clearStoreFinderState];
