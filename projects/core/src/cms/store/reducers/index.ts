import { InjectionToken, Provider } from '@angular/core';

import {
  ActionReducer,
  ActionReducerMap,
  MetaReducer,
  Action,
  combineReducers
} from '@ngrx/store';

import {
  CmsState,
  COMPONENT_ENTITY,
  NAVIGATION_DETAIL_ENTITY,
  PAGE_DATA_ENTITY,
  CONTENT_PAGES_ENTITY,
  PRODUCT_PAGES_ENTITY,
  CATEGORY_PAGES_ENTITY,
  CATALOG_PAGES_ENTITY
} from '../cms-state';
import { entityReducer } from '../../../state';
import { NodeItem } from '../../model/node-item.model';
import { Page } from '../../model/page.model';
import { entityLoaderReducer } from '../../../state/utils/entity-loader/entity-loader.reducer';

import { latestPageKeyReducer } from './latest-page-key.reducer';
import * as fromNavigation from './navigation-entry-item.reducer';
import { pageDataReducer } from './page-data.reducer';
import * as fromPage from './page.reducer';

export function getReducers(): ActionReducerMap<CmsState> {
  return {
    // TODO:#1135 - remove
    page: fromPage.reducer,

    newPage: combineReducers({
      pageData: entityReducer<Page>(PAGE_DATA_ENTITY, pageDataReducer),
      latestPageId: latestPageKeyReducer,
      index: combineReducers({
        content: entityLoaderReducer<string>(CONTENT_PAGES_ENTITY),
        product: entityLoaderReducer<string>(PRODUCT_PAGES_ENTITY),
        category: entityLoaderReducer<string>(CATEGORY_PAGES_ENTITY),
        catalog: entityLoaderReducer<string>(CATALOG_PAGES_ENTITY)
      })
    }),
    component: entityLoaderReducer(COMPONENT_ENTITY),
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
