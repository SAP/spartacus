import { InjectionToken, Provider } from '@angular/core';
import {
  Action,
  ActionReducer,
  ActionReducerMap,
  combineReducers,
  MetaReducer,
} from '@ngrx/store';
import { AuthActions } from '../../../auth/user-auth/store/actions/index';
import { PageType } from '../../../model/cms.model';
import { SiteContextActions } from '../../../site-context/store/actions/index';
import { entityLoaderReducer } from '../../../state/utils/entity-loader/entity-loader.reducer';
import { entityReducer } from '../../../state/utils/entity/entity.reducer';
import { NodeItem } from '../../model/node-item.model';
import {
  CmsState,
  COMPONENT_ENTITY,
  NAVIGATION_DETAIL_ENTITY,
  StateWithCms,
} from '../cms-state';
import * as fromComponentsReducer from './components.reducer';
import * as fromNavigation from './navigation-entry-item.reducer';
import * as fromPageReducer from './page-data.reducer';
import * as fromPageIndexReducer from './page-index.reducer';

export function getReducers(): ActionReducerMap<CmsState> {
  return {
    page: combineReducers({
      pageData: fromPageReducer.reducer,
      index: combineReducers({
        content: entityLoaderReducer<string>(
          PageType.CONTENT_PAGE,
          fromPageIndexReducer.reducer(PageType.CONTENT_PAGE)
        ),
        product: entityLoaderReducer<string>(
          PageType.PRODUCT_PAGE,
          fromPageIndexReducer.reducer(PageType.PRODUCT_PAGE)
        ),
        category: entityLoaderReducer<string>(
          PageType.CATEGORY_PAGE,
          fromPageIndexReducer.reducer(PageType.CATEGORY_PAGE)
        ),
        catalog: entityLoaderReducer<string>(
          PageType.CATALOG_PAGE,
          fromPageIndexReducer.reducer(PageType.CATALOG_PAGE)
        ),
      }),
    }),
    components: entityReducer(COMPONENT_ENTITY, fromComponentsReducer.reducer),
    navigation: entityLoaderReducer<NodeItem>(
      NAVIGATION_DETAIL_ENTITY,
      fromNavigation.reducer
    ),
  };
}

export const reducerToken: InjectionToken<ActionReducerMap<CmsState>> =
  new InjectionToken<ActionReducerMap<CmsState>>('CmsReducers');

export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers,
};

export function clearCmsState(
  reducer: ActionReducer<StateWithCms, Action>
): ActionReducer<StateWithCms, Action> {
  return function (state, action) {
    if (
      action.type === SiteContextActions.LANGUAGE_CHANGE ||
      action.type === AuthActions.LOGOUT ||
      action.type === AuthActions.LOGIN
    ) {
      state = undefined;
    }
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<StateWithCms>[] = [clearCmsState];
