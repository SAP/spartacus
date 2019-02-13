import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import {
  map,
  catchError,
  switchMap,
  mergeMap,
  filter,
  take
} from 'rxjs/operators';

import * as componentActions from '../actions/component.action';
import * as pageActions from '../actions/page.action';
import { EntitySuccessAction } from '../../../state';
import { ContentSlotData } from '../../model/content-slot-data.model';
import { Page } from '../../model/page.model';
import { OccCmsService } from '../../occ/occ-cms.service';
import { RoutingService, PageContext } from '../../../routing/index';
import { CMSPage } from '../../../occ/occ-models/index';

@Injectable()
export class PageEffects {
  @Effect()
  loadPage$: Observable<Action> = this.actions$.pipe(
    ofType(
      pageActions.LOAD_PAGEDATA,
      pageActions.REFRESH_LATEST_PAGE,
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
          mergeMap(context => this.loadPageInternal(context))
        );
      } else {
        return this.loadPageInternal(pageContext);
      }
    })
  );

  constructor(
    private actions$: Actions,
    private occCmsService: OccCmsService,
    private routingService: RoutingService
  ) {
    // TODO:#1135 - not needed?
    // private defaultPageService: DefaultPageService,
  }

  private loadPageInternal(pageContext: PageContext): Observable<Action> {
    return this.occCmsService.loadPageData(pageContext).pipe(
      mergeMap(data => {
        const page = this.getPageData(data);
        return [
          new pageActions.LoadPageDataSuccess(page),
          new pageActions.UpdateLatestPageId(page.pageId),
          new componentActions.GetComponentFromPage(this.getComponents(data)),
          new EntitySuccessAction(pageContext.type, pageContext.id, page.pageId)
        ];
      }),
      catchError(error => of(new pageActions.LoadPageDataFail(error)))
    );
  }

  private getPageData(res: any): Page {
    const page: Page = {
      loadTime: Date.now(),
      uuid: res.uuid,
      name: res.name,
      title: res.title,
      catalogUuid: this.getCatalogUuid(res),
      pageId: res.uid,
      template: res.template,
      slots: {}
    };

    for (const slot of res.contentSlots.contentSlot) {
      page.slots[slot.position] = {
        uid: slot.slotId,
        uuid: slot.slotUuid,
        catalogUuid: this.getCatalogUuid(slot),
        components: []
      } as ContentSlotData;

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

    return page;
  }

  private getCatalogUuid(cmsItem: any): string {
    if (cmsItem.properties && cmsItem.properties.smartedit) {
      const smartEditProp = cmsItem.properties.smartedit;
      if (smartEditProp.catalogVersionUuid) {
        return smartEditProp.catalogVersionUuid;
      } else if (smartEditProp.classes) {
        let catalogUuid: string;
        const seClass = smartEditProp.classes.split(' ');
        seClass.forEach(item => {
          if (item.indexOf('smartedit-catalog-version-uuid') > -1) {
            catalogUuid = item.substr('smartedit-catalog-version-uuid-'.length);
          }
        });
        return catalogUuid;
      }
    }
  }

  private getComponents(pageData: CMSPage): any[] {
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
