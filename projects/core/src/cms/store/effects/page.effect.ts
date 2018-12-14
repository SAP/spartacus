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
import { PageType, CMSPage } from '../../../occ/occ-models/index';

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
      uuid: res.uuid,
      name: res.name,
      catalogUuid: this.getCatalogUuid(res),
      pageId: res.uid,
      template: res.template,
      seen: new Array<string>(),
      slots: {}
    };
    page.seen.push(pageContext.id);

    for (const slot of res.contentSlots.contentSlot) {
      page.slots[slot.position] = {
        uid: slot.slotId,
        uuid: slot.slotUuid,
        catalogUuid: this.getCatalogUuid(slot),
        components: []
      };
      if (
        slot.components.component &&
        Array.isArray(slot.components.component)
      ) {
        for (const component of slot.components.component) {
          page.slots[slot.position].components.push({
            uid: component.uid,
            uuid: component.uuid,
            catalogUuid: this.getCatalogUuid(component),
            typeCode: component.typeCode
          });
        }
      }
    }

    return { key: this.getPageKey(pageContext, page), value: page };
  }

  private getPageKey(pageContext: PageContext, page: Page): string {
    switch (pageContext.type) {
      case PageType.CATEGORY_PAGE:
      case PageType.CATALOG_PAGE:
      case PageType.PRODUCT_PAGE: {
        const defaultPageIds = this.defaultPageService.getDefaultPageIdsBytype(
          pageContext.type
        );
        if (defaultPageIds.indexOf(page.pageId) > -1) {
          return page.pageId + '_' + pageContext.type;
        } else {
          return pageContext.id + '_' + pageContext.type;
        }
      }

      case PageType.CONTENT_PAGE: {
        return page.pageId + '_' + pageContext.type;
      }
    }
  }

  private getCatalogUuid(cmsItem: any): string {
    if (cmsItem.properties) {
      return cmsItem.properties.smartedit.catalogVersionUuid;
    } else {
      // due to smartedit bug: CMSX-8181, for page and slot, we have to hard-coded the catalogUUID.
      return 'electronicsContentCatalog/Online';
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
          for (const component of slot.components.component as any) {
            // we dont put smartedit properties into store
            if (component.properties) {
              component.properties = undefined;
            }
            components.push(component);
          }
        }
      }
    }
    return components;
  }
}
