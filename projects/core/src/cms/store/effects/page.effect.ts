import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import {
  map,
  catchError,
  switchMap,
  mergeMap,
  filter,
  take
} from 'rxjs/operators';

import * as pageActions from '../actions/page.action';
import * as componentActions from '../actions/component.action';
import { OccCmsService } from '../../occ/occ-cms.service';
import { DefaultPageService } from '../../occ/default-page.service';

import { Page } from '../../model/page.model';

import { RoutingService, PageContext } from '../../../routing/index';
import { PageType, CMSPage } from '../../../occ-models/index';

@Injectable()
export class PageEffects {
  @Effect()
  loadPage$: Observable<any> = this.actions$.pipe(
    ofType(
      pageActions.LOAD_PAGEDATA,
      '[Site-context] Language Change',
      '[Auth] Logout',
      '[Auth] Login'
    ),
    map((action: pageActions.LoadPageData) => action.payload),
    switchMap(pageContext => {
      if (pageContext === undefined) {
        return this.routingService.getRouterState().pipe(
          filter(routerState => routerState && routerState.state),
          filter(routerState => routerState.state.cmsRequired),
          map(routerState => routerState.state.context),
          take(1),
          mergeMap(context =>
            this.occCmsService.loadPageData(context).pipe(
              mergeMap(data => {
                return [
                  new pageActions.LoadPageDataSuccess(
                    this.getPageData(data, context)
                  ),
                  new componentActions.GetComponentFromPage(
                    this.getComponents(data)
                  )
                ];
              }),
              catchError(error => of(new pageActions.LoadPageDataFail(error)))
            )
          )
        );
      } else {
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
      }
    })
  );

  constructor(
    private actions$: Actions,
    private occCmsService: OccCmsService,
    private defaultPageService: DefaultPageService,
    private routingService: RoutingService
  ) {}

  private getPageData(
    res: any,
    pageContext: PageContext
  ): { key: string; value: Page } {
    const page: Page = {
      loadTime: Date.now(),
      name: res.name,
      pageId: res.uid,
      template: res.template,
      seen: new Array<string>(),
      slots: {}
    };
    page.seen.push(pageContext.id);

    for (const slot of res.contentSlots.contentSlot) {
      page.slots[slot.position] = [];
      if (
        slot.components.component &&
        Array.isArray(slot.components.component)
      ) {
        for (const component of slot.components.component) {
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
        const defaultPageIds = this.defaultPageService.getDefaultPageIdsBytype(
          pageContext.type
        );
        if (defaultPageIds.indexOf(page.pageId) > -1) {
          return { key: page.pageId + '_' + pageContext.type, value: page };
        } else {
          return { key: pageContext.id + '_' + pageContext.type, value: page };
        }
      }

      case PageType.CONTENT_PAGE: {
        return { key: page.pageId + '_' + pageContext.type, value: page };
      }
    }
  }

  private getComponents(pageData: CMSPage) {
    const components = [];
    if (pageData) {
      for (const slot of pageData.contentSlots.contentSlot) {
        if (
          slot.components.component &&
          Array.isArray(slot.components.component)
        ) {
          for (const component of slot.components.component) {
            components.push(component);
          }
        }
      }
    }
    return components;
  }
}
