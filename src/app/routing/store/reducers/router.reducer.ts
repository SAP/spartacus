import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Params
} from '@angular/router';
import { createFeatureSelector, ActionReducerMap } from '@ngrx/store';

import * as fromRouter from '@ngrx/router-store';
import { PageContext, PageType } from '../../models/page-context.model';

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
  context: PageContext;
}

export interface State {
  routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<State> = {
  routerReducer: fromRouter.routerReducer
};

export const getRouterState = createFeatureSelector<
  fromRouter.RouterReducerState<RouterStateUrl>
>('routerReducer');

export class CustomSerializer
  implements fromRouter.RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const { url } = routerState;
    const { queryParams } = routerState.root;

    let state: ActivatedRouteSnapshot = routerState.root;
    while (state.firstChild) {
      state = state.firstChild;
    }
    const { params } = state;

    let context: PageContext;
    if (params['productCode']) {
      context = { id: params['productCode'], type: PageType.PRODUCT_PAGE };
    } else if (params['categoryCode']) {
      context = { id: params['categoryCode'], type: PageType.CATEGORY_PAGE };
    } else if (params['brandCode']) {
      context = { id: params['brandCode'], type: PageType.CATEGORY_PAGE };
    } else if (params['query']) {
      context = { id: 'search', type: PageType.CONTENT_PAGE };
    } else if (url === '/cart') {
      context = { id: 'cart', type: PageType.CONTENT_PAGE };
    } else if (url === '/') {
      context = { id: 'homepage', type: PageType.CONTENT_PAGE };
    }

    return { url, queryParams, params, context };
  }
}
