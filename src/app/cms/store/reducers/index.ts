import {
  ActionReducerMap,
  createFeatureSelector,
  MetaReducer,
  ActionReducer,
  MemoizedSelector
} from '@ngrx/store';

import * as fromPage from './page.reducer';
import * as fromComponent from './component.reducer';

export interface CmsState {
  page: fromPage.PageState;
  component: fromComponent.ComponentState;
}

export const reducers: ActionReducerMap<CmsState> = {
  page: fromPage.reducer,
  component: fromComponent.reducer
};

export const getCmsState: MemoizedSelector<
  any,
  CmsState
> = createFeatureSelector<CmsState>('cms');

export function clearCmsState(reducer: ActionReducer<any>): ActionReducer<any> {
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
