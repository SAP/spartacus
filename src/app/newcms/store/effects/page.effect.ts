import { Injectable } from "@angular/core";

import { Effect, Actions } from "@ngrx/effects";
import { of } from "rxjs/observable/of";
import { map, catchError, switchMap, mergeMap } from "rxjs/operators";

import * as pageActions from "../actions/page.action";
import * as componentActions from "../actions/component.action";
import * as fromServices from "../../services";

import { Page } from "../../models/page.model";
import {
  PageContext,
  PageType
} from "../../../routing/models/page-context.model";

@Injectable()
export class PageEffects {
  constructor(
    private actions$: Actions,
    private occCmsService: fromServices.OccCmsService,
    private defaultPageService: fromServices.DefaultPageService
  ) {}

  @Effect()
  loadPage$ = this.actions$
    .ofType(pageActions.LOAD_PAGEDATA, "[Site-context] Language Change")
    .pipe(
      map((action: pageActions.LoadPageData) => action.payload),
      switchMap(pageContext => {
        return this.occCmsService.loadPageData(pageContext).pipe(
          mergeMap(data => {
            return [
              new pageActions.LoadPageDataSuccess(
                this.getPageData(data, pageContext)
              ),
              new componentActions.GetComponentFromPage(
                this.getComponents(data)
              )
            ];
          }),
          catchError(error => of(new pageActions.LoadPageDataFail(error)))
        );
      })
    );

  private getPageData(res: any, pageContext: PageContext): any {
    let page: Page = {
      loadTime: Date.now(),
      name: res.name,
      pageId: res.pageId,
      template: res.template,
      seen: new Array<string>(),
      slots: {}
    };
    page.seen.push(pageContext.id);

    for (let slot of res.contentSlots.contentSlot) {
      page.slots[slot.position] = [];
      if (slot.components.component) {
        for (let component of slot.components.component) {
          page.slots[slot.position].push({
            uid: component.uid,
            typeCode: component.typeCode
          });
        }
      }
    }
    this.defaultPageService.getDefaultPageIdsBytype(pageContext.type);
    switch (pageContext.type) {
      case PageType.CATEGORY_PAGE:
      case PageType.CATALOG_PAGE:
      case PageType.PRODUCT_PAGE: {
        let defaultPageIds = this.defaultPageService.getDefaultPageIdsBytype(
          pageContext.type
        );
        if (defaultPageIds.includes(page.pageId)) {
          return { key: page.pageId + "_" + pageContext.type, value: page };
        } else {
          return { key: pageContext.id + "_" + pageContext.type, value: page };
        }
      }

      case PageType.CONTENT_PAGE: {
        return { key: page.pageId + "_" + pageContext.type, value: page };
      }
    }
  }

  private getComponents(pageData: any) {
    let components: any[] = [];
    if (pageData) {
      for (const slot of pageData.contentSlots.contentSlot) {
        if (slot.components.component) {
          for (const component of slot.components.component) {
            components.push(component);
          }
        }
      }
    }
    return components;
  }
}
