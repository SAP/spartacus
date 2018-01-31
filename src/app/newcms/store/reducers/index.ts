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

export const getCmsState = createFeatureSelector<CmsState>('cms');
