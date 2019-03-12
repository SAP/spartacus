import { InjectionToken, Provider } from '@angular/core';
import { RouterStateSnapshot, Params } from '@angular/router';

import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap,
  MemoizedSelector
} from '@ngrx/store';
import * as fromNgrxRouter from '@ngrx/router-store';

import * as fromActions from '../actions';
import { ROUTING_FEATURE } from '../../state';
import { PageContext } from '../../models/page-context.model';
import { PageType } from '../../../occ/occ-models/index';
import { CmsActivatedRouteSnapshot } from '../../models/cms-route';

export interface RouterState
  extends fromNgrxRouter.RouterReducerState<ActivatedRouterStateSnapshot> {
  redirectUrl: string;
}

export const initialState: RouterState = {
  redirectUrl: '',
  navigationId: 0,
  state: {
    url: '',
    queryParams: {},
    params: {},
    context: {
      id: ''
    },
    cmsRequired: false
  }
};

export interface ActivatedRouterStateSnapshot {
  url: string;
  queryParams: Params;
  params: Params;
  context: PageContext;
  cmsRequired: boolean;
}

export interface State {
  router: RouterState;
}

export function getReducers(): ActionReducerMap<State> {
  return {
    router: reducer
  };
}

export function reducer(
  state: RouterState = initialState,
  action: any
): RouterState {
  switch (action.type) {
    case fromActions.SAVE_REDIRECT_URL: {
      return {
        ...state,
        redirectUrl: action.payload
      };
    }
    case fromActions.CLEAR_REDIRECT_URL: {
      return {
        ...state,
        redirectUrl: ''
      };
    }
    case fromNgrxRouter.ROUTER_NAVIGATION:
    case fromNgrxRouter.ROUTER_ERROR:
    case fromNgrxRouter.ROUTER_CANCEL: {
      const currentUrl = action.payload.routerState
        ? action.payload.routerState.url
        : '';
      const contextId = action.payload.routerState
        ? action.payload.routerState.context.id
        : '';
      let redirectUrl;
      if (
        contextId === 'login' ||
        contextId === 'register' ||
        currentUrl === state.redirectUrl
      ) {
        redirectUrl = state.redirectUrl;
      } else {
        redirectUrl = '';
      }

      return {
        redirectUrl: redirectUrl,
        state: action.payload.routerState,
        navigationId: action.payload.event.id
      };
    }
    default: {
      return state;
    }
  }
}

export const reducerToken: InjectionToken<
  ActionReducerMap<State>
> = new InjectionToken<ActionReducerMap<State>>('RouterReducers');

export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers
};

export const getRouterFeatureState: MemoizedSelector<
  any,
  any
> = createFeatureSelector<
  fromNgrxRouter.RouterReducerState<ActivatedRouterStateSnapshot>
>(ROUTING_FEATURE);

export const getRouterState: MemoizedSelector<any, any> = createSelector(
  getRouterFeatureState,
  (state: any) => state[ROUTING_FEATURE]
);

export const getPageContext: MemoizedSelector<
  any,
  PageContext
> = createSelector(
  getRouterState,
  (routingState: any) => routingState.state.context
);

export const getRedirectUrl: MemoizedSelector<any, any> = createSelector(
  getRouterState,
  state => state.redirectUrl
);

/* The serializer is there to parse the RouterStateSnapshot,
and to reduce the amount of properties to be passed to the reducer.
 */
export class CustomSerializer
  implements
    fromNgrxRouter.RouterStateSerializer<ActivatedRouterStateSnapshot> {
  serialize(routerState: RouterStateSnapshot): ActivatedRouterStateSnapshot {
    const { url } = routerState;
    const { queryParams } = routerState.root;

    let state: CmsActivatedRouteSnapshot = routerState.root as CmsActivatedRouteSnapshot;
    let cmsRequired = false;
    let context: PageContext;
    while (state.firstChild) {
      state = state.firstChild as CmsActivatedRouteSnapshot;
      if (state.data && state.data.cxCmsContext) {
        context = state.data.cxCmsContext;
      }

      // we assume, that any route that has CmsPageGuard or it's child
      // is cmsRequired
      if (
        context ||
        (state.routeConfig &&
          state.routeConfig.canActivate &&
          state.routeConfig.canActivate.find(
            x => x && x.guardName === 'CmsPageGuards'
          ))
      ) {
        cmsRequired = true;
      }
    }
    const { params } = state;

    // we give smartedit preview page a PageContext
    if (state.url.length > 0 && state.url[0].path === 'cx-preview') {
      context = {
        id: 'smartedit-preview',
        type: PageType.CONTENT_PAGE
      };
    } else {
      if (params['productCode']) {
        context = { id: params['productCode'], type: PageType.PRODUCT_PAGE };
      } else if (params['categoryCode']) {
        context = { id: params['categoryCode'], type: PageType.CATEGORY_PAGE };
      } else if (params['brandCode']) {
        context = { id: params['brandCode'], type: PageType.CATEGORY_PAGE };
      } else if (params['query']) {
        context = { id: 'search', type: PageType.CONTENT_PAGE };
      } else if (state.data.pageLabel !== undefined) {
        context = { id: state.data.pageLabel, type: PageType.CONTENT_PAGE };
      } else if (!context) {
        let stateForContext = state;
        while (stateForContext.parent && stateForContext.parent.parent) {
          stateForContext = stateForContext.parent;
        }

        if (stateForContext.url.length > 0) {
          const pageLabel =
            '/' +
            stateForContext.url.map(urlSegment => urlSegment.path).join('/');
          context = {
            id: pageLabel,
            type: PageType.CONTENT_PAGE
          };
        } else {
          context = {
            id: 'homepage',
            type: PageType.CONTENT_PAGE
          };
        }
      }
    }

    return { url, queryParams, params, context, cmsRequired };
  }
}
