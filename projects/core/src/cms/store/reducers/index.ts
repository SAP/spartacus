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
import { NAVIGATION_DETAIL_ENTITY, CmsState } from '../cms-state';
import { NodeItem } from '../../model/node-item.model';
import { entityLoaderReducer } from '../../../state/utils/entity-loader/entity-loader.reducer';

export function getReducers(): ActionReducerMap<CmsState> {
  return {
    page: fromPage.reducer,
    component: fromComponent.reducer,
    navigation: entityLoaderReducer<NodeItem>(
      NAVIGATION_DETAIL_ENTITY,
      fromNavigation.reducer
    )
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
      action.type === '[Auth] Logout' ||
      action.type === '[Auth] Login'
    ) {
      state = undefined;
    }
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [clearCmsState];
