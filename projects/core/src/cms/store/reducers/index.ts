import { InjectionToken, Provider } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  MetaReducer,
  Action
} from '@ngrx/store';

import * as fromPage from './page.reducer';
import * as fromComponent from './component.reducer';
import * as fromNavigation from './navigation-entry-item.reducer';
import { CmsState } from '../cms-state';

export function getReducers(): ActionReducerMap<CmsState> {
  return {
    page: fromPage.reducer,
    component: fromComponent.reducer,
    navigation: fromNavigation.reducer
  };
}

export const reducerToken: InjectionToken<
  ActionReducerMap<CmsState>
> = new InjectionToken<ActionReducerMap<CmsState>>('CmsReducers');

export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers
};

export function clearCmsState(
  reducer: ActionReducer<any, Action>
): ActionReducer<any, Action> {
  return function(state, action) {
    if (
      action.type === '[Site-context] Language Change' ||
      action.type === '[Site-context] Currency Change' ||
      action.type === '[Auth] Logout' ||
      action.type === '[Auth] Login'
    ) {
      state = undefined;
    }
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [clearCmsState];
