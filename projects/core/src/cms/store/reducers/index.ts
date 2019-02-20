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
  StateWithCms,
  PAGE_DATA_ENTITY
} from '../cms-state';
import { PageType } from '../../../occ';
import { entityReducer } from '../../../state';
import { NodeItem } from '../../model/node-item.model';
import { Page } from '../../model/page.model';
import { LOGIN, LOGOUT } from '../../../auth/store/actions/login-logout.action';
import { LANGUAGE_CHANGE } from '../../../site-context/store/actions/languages.action';
import { entityLoaderReducer } from '../../../state/utils/entity-loader/entity-loader.reducer';

import * as fromNavigation from './navigation-entry-item.reducer';
import * as fromPageReducer from './page-data.reducer';
import * as fromPageIndexReducer from './page-index.reducer';

export function getReducers(): ActionReducerMap<CmsState> {
  return {
    page: combineReducers({
      pageData: entityReducer<Page>(PAGE_DATA_ENTITY, fromPageReducer.reducer),
      index: combineReducers({
        content: entityLoaderReducer<string>(
          PageType.CONTENT_PAGE,
          fromPageIndexReducer.reducer
        ),
        product: entityLoaderReducer<string>(
          PageType.PRODUCT_PAGE,
          fromPageIndexReducer.reducer
        ),
        category: entityLoaderReducer<string>(
          PageType.CATEGORY_PAGE,
          fromPageIndexReducer.reducer
        ),
        catalog: entityLoaderReducer<string>(
          PageType.CATALOG_PAGE,
          fromPageIndexReducer.reducer
        )
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
      action.type === LANGUAGE_CHANGE ||
      action.type === LOGOUT ||
      action.type === LOGIN
    ) {
      state = undefined;
    }
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<StateWithCms>[] = [clearCmsState];
