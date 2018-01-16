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
  cmsRequired: boolean;
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
    console.log(state);

    let cmsRequired = false;
    if (
      state.routeConfig.canActivate &&
      state.routeConfig.canActivate.find(x => x.name === 'CmsPageGuards')
    ) {
      cmsRequired = true;
    }

    let context: PageContext;
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
    } else if (state.url.length > 0) {
      context = {
        id: state.url[state.url.length - 1].path,
        type: PageType.CONTENT_PAGE
      };
    } else {
      context = {
        id: 'homepage',
        type: PageType.CONTENT_PAGE
      };
    }

    return { url, queryParams, params, context, cmsRequired };
  }
}
