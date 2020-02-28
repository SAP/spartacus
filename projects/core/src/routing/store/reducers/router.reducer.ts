import { InjectionToken, Provider } from '@angular/core';
import { RouterStateSnapshot } from '@angular/router';
import * as fromNgrxRouter from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';
import { PageType } from '../../../model/cms.model';
import { CmsActivatedRouteSnapshot } from '../../models/cms-route';
import { PageContext } from '../../models/page-context.model';
import {
  ActivatedRouterStateSnapshot,
  RouterState,
  State,
} from '../routing-state';

export const initialState: RouterState = {
  navigationId: 0,
  state: {
    url: '',
    queryParams: {},
    params: {},
    context: {
      id: '',
    },
    cmsRequired: false,
  },
  nextState: undefined,
};

export function getReducers(): ActionReducerMap<State> {
  return {
    router: reducer,
  };
}

export function reducer(
  state: RouterState = initialState,
  action: any
): RouterState {
  switch (action.type) {
    case fromNgrxRouter.ROUTER_NAVIGATION: {
      return {
        ...state,
        nextState: action.payload.routerState,
        navigationId: action.payload.event.id,
      };
    }

    case fromNgrxRouter.ROUTER_ERROR:
    case fromNgrxRouter.ROUTER_CANCEL: {
      return {
        ...state,
        nextState: undefined,
      };
    }

    case fromNgrxRouter.ROUTER_NAVIGATED: {
      return {
        state: action.payload.routerState,
        navigationId: action.payload.event.id,
        nextState: undefined,
      };
    }

    default: {
      return state;
    }
  }
}

export const reducerToken: InjectionToken<ActionReducerMap<
  State
>> = new InjectionToken<ActionReducerMap<State>>('RouterReducers');

export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers,
};

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

      // we use context information embedded in Cms driven routes from any parent route
      if (state.data && state.data.cxCmsRouteContext) {
        context = state.data.cxCmsRouteContext;
      }

      // we assume, that any route that has CmsPageGuard or it's child
      // is cmsRequired
      if (
        !cmsRequired &&
        (context ||
          (state.routeConfig &&
            state.routeConfig.canActivate &&
            state.routeConfig.canActivate.find(
              x => x && x.guardName === 'CmsPageGuard'
            )))
      ) {
        cmsRequired = true;
      }
    }
    const { params } = state;

    // we give smartedit preview page a PageContext
    if (state.url.length > 0 && state.url[0].path === 'cx-preview') {
      context = {
        id: 'smartedit-preview',
        type: PageType.CONTENT_PAGE,
      };
    } else {
      if (params['productCode']) {
        context = { id: params['productCode'], type: PageType.PRODUCT_PAGE };
      } else if (params['categoryCode']) {
        context = { id: params['categoryCode'], type: PageType.CATEGORY_PAGE };
      } else if (params['brandCode']) {
        context = { id: params['brandCode'], type: PageType.CATEGORY_PAGE };
      } else if (state.data.pageLabel !== undefined) {
        context = { id: state.data.pageLabel, type: PageType.CONTENT_PAGE };
      } else if (!context) {
        if (state.url.length > 0) {
          const pageLabel =
            '/' + state.url.map(urlSegment => urlSegment.path).join('/');
          context = {
            id: pageLabel,
            type: PageType.CONTENT_PAGE,
          };
        } else {
          context = {
            id: 'homepage',
            type: PageType.CONTENT_PAGE,
          };
        }
      }
    }

    return { url, queryParams, params, context, cmsRequired };
  }
}
