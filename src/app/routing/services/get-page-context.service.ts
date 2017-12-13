import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

import { PageContext, PageType } from "../models/page-context.model";

@Injectable()
export class GetPageContextService {
  getPageContext(route: ActivatedRouteSnapshot): PageContext {
    const url: string = route.url.join("/");

    let state: ActivatedRouteSnapshot = route;
    while (state.firstChild) {
      state = state.firstChild;
    }
    const { params } = state;

    let context: PageContext;
    if (params["productCode"]) {
      context = { id: params["productCode"], type: PageType.PRODUCT_PAGE };
    } else if (params["categoryCode"]) {
      context = { id: params["categoryCode"], type: PageType.CATEGORY_PAGE };
    } else if (params["brandCode"]) {
      context = { id: params["brandCode"], type: PageType.CATEGORY_PAGE };
    } else if (params["query"]) {
      context = { id: "search", type: PageType.CONTENT_PAGE };
    } else if (url == "cart") {
      context = { id: "cart", type: PageType.CONTENT_PAGE };
    } else if (url == "") {
      context = { id: "homepage", type: PageType.CONTENT_PAGE };
    }

    return context;
  }
}
