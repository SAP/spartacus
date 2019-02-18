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
  StateWithCms
} from '../cms-state';
import { PageType } from '../../../occ';
import { entityReducer } from '../../../state';
import { NodeItem } from '../../model/node-item.model';
import { Page } from '../../model/page.model';
import { entityLoaderReducer } from '../../../state/utils/entity-loader/entity-loader.reducer';

import * as fromNavigation from './navigation-entry-item.reducer';
import * as fromPageReducer from './page.reducer';

export function getReducers(): ActionReducerMap<CmsState> {
  return {
    page: combineReducers({
      pageData: entityReducer<Page>(PAGE_DATA_ENTITY, fromPageReducer.reducer),
      index: combineReducers({
        content: entityLoaderReducer<string>(PageType.CONTENT_PAGE),
        product: entityLoaderReducer<string>(PageType.PRODUCT_PAGE),
        category: entityLoaderReducer<string>(PageType.CATEGORY_PAGE),
        catalog: entityLoaderReducer<string>(PageType.CATALOG_PAGE)
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
  reducer: ActionReducer<StateWithCms, Action>
): ActionReducer<StateWithCms, Action> {
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

export const metaReducers: MetaReducer<StateWithCms>[] = [clearCmsState];
