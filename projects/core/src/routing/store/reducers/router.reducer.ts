import { Injectable, InjectionToken, Provider } from '@angular/core';
import { RouterStateSnapshot } from '@angular/router';
import * as fromNgrxRouter from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';
import { PageType } from '../../../model/cms.model';
import { RoutingConfigService } from '../../configurable-routes/routing-config.service';
import { CmsActivatedRouteSnapshot } from '../../models/cms-route';
import { PageContext } from '../../models/page-context.model';
import {
  ActivatedRouterStateSnapshot,
  RouterState,
  State,
} from '../routing-state';

// private enum
export enum SemanticRoutes {
  PRODUCT = 'product',
  CATEGORY = 'category',
  BRAND = 'brand',
  HOME = 'home',
}

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
    semanticRoute: undefined,
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
@Injectable()
export class CustomSerializer
  implements
    fromNgrxRouter.RouterStateSerializer<ActivatedRouterStateSnapshot> {
  serialize(routerState: RouterStateSnapshot): ActivatedRouterStateSnapshot {
    const { url } = routerState;
    const { queryParams } = routerState.root;

    let state: CmsActivatedRouteSnapshot = routerState.root as CmsActivatedRouteSnapshot;
    let cmsRequired = false;
    let context: PageContext;
    let semanticRoute: string;

    while (state.firstChild) {
      state = state.firstChild as CmsActivatedRouteSnapshot;

      // we use semantic route information embedded from any parent route
      if (state.data?.cxRoute) {
        semanticRoute = state.data?.cxRoute;
      }

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
              (x) => x && x.guardName === 'CmsPageGuard'
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
        semanticRoute = SemanticRoutes.PRODUCT;
      } else if (params['categoryCode']) {
        context = { id: params['categoryCode'], type: PageType.CATEGORY_PAGE };
        semanticRoute = SemanticRoutes.CATEGORY;
      } else if (params['brandCode']) {
        context = { id: params['brandCode'], type: PageType.CATEGORY_PAGE };
        semanticRoute = SemanticRoutes.BRAND;
      } else if (state.data.pageLabel !== undefined) {
        context = { id: state.data.pageLabel, type: PageType.CONTENT_PAGE };
        // We don't assign `semanticRoute` here, because Angular Routes with defined `data.pageLabel` are assumed
        // to contain also the `data.cxRoute` defined, so `semanticRoute` should already have been recognized.
      } else if (!context) {
        if (state.url.length > 0) {
          const pageLabel =
            '/' + state.url.map((urlSegment) => urlSegment.path).join('/');
          context = {
            id: pageLabel,
            type: PageType.CONTENT_PAGE,
          };
          // If `semanticRoute` couldn't be recognized using `data.cxRoute` property, let's lookup the routing configuration
          // to find the semantic route that has exactly the same configured path as the current URL.
          semanticRoute = semanticRoute || this.lookupSemanticRoute(pageLabel);
        } else {
          context = {
            id: 'homepage',
            type: PageType.CONTENT_PAGE,
          };
          semanticRoute = SemanticRoutes.HOME;
        }
      }
    }

    return {
      url,
      queryParams,
      params,
      context,
      cmsRequired,
      semanticRoute,
    };
  }

  /**
   * Returns the semantic route name for given page label.
   *
   * *NOTE*: It works only for simple static urls that are equal to the page label
   * of cms-driven content page. For example: `/my-account/address-book`.
   *
   * It doesn't work for URLs with dynamic parameters. But such case can be handled
   * by reading the defined `data.cxRoute` from the Angular Routes.
   *
   * It doesn't work for cms-driven child routes, because the guessed page label
   * is longer than the real one (i.e. `/store-finder/view-all`). Only when backend
   * returns the correct one along with cms page data (i.e. `pageLabel: '/store-finder'`),
   * then it could be used. But it's too late for this serializer.
   *
   * This means that recognizing semantic route name of cms-driven child routes
   * is NOT SUPPORTED.
   *
   * @param path path to be found in the routing config
   */
  private lookupSemanticRoute(pageLabel: string): string {
    // Page label is assumed to start with `/`, but Spartacus configured paths
    // don't start with slash. So we remove the leading slash:
    return this.routingConfig.getRouteName(pageLabel.substr(1));
  }

  constructor(private routingConfig: RoutingConfigService) {}
}
