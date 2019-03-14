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
import { ContentSlotData } from '../../model/content-slot-data.model';
import { Page } from '../../model/page.model';
import { OccCmsService } from '../../occ/occ-cms.service';
import { RoutingService } from '../../../routing/index';
import { CMSPage, CmsComponent } from '../../../occ/occ-models/index';
import { LOGIN, LOGOUT } from '../../../auth/store/actions/login-logout.action';
import { LANGUAGE_CHANGE } from '../../../site-context/store/actions/languages.action';
import { JSP_INCLUDE_CMS_COMPONENT_TYPE } from '../../config/cms-config';
import { ContentSlotComponentData } from '../../model/content-slot-component-data.model';

@Injectable()
export class PageEffects {
  @Effect()
  refreshPage$: Observable<Action> = this.actions$.pipe(
    ofType(LANGUAGE_CHANGE, LOGOUT, LOGIN),
    switchMap(_ =>
      this.routingService.getRouterState().pipe(
        filter(
          routerState =>
            routerState && routerState.state && routerState.state.cmsRequired
        ),
        map(routerState => routerState.state.context),
        take(1),
        mergeMap(context => of(new pageActions.LoadPageData(context)))
      )
    )
  );

  @Effect()
  loadPageData$: Observable<Action> = this.actions$.pipe(
    ofType(pageActions.LOAD_PAGE_DATA),
    map((action: pageActions.LoadPageData) => action.payload),
    switchMap(pageContext =>
      this.occCmsService.loadPageData(pageContext).pipe(
        mergeMap(data => {
          const page = this.getPageData(data);
          return [
            new pageActions.LoadPageDataSuccess(pageContext, page),
            new componentActions.GetComponentFromPage(this.getComponents(data))
          ];
        }),
        catchError(error =>
          of(new pageActions.LoadPageDataFail(pageContext, error))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private occCmsService: OccCmsService,
    private routingService: RoutingService
  ) {}

  private getPageData(res: any): Page {
    const page: Page = {
      loadTime: Date.now(),
      uuid: res.uuid,
      name: res.name,
      type: res.typeCode,
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
          page.slots[slot.position].components.push(
            this.getComponentData(component)
          );
        }
      }
    }

    return page;
  }

  private getComponentData(
    component: ContentSlotComponentData
  ): ContentSlotComponentData {
    const comp: ContentSlotComponentData = {
      uid: component.uid,
      uuid: component.uuid,
      typeCode: component.typeCode
    };

    if (component.catalogUuid) {
      comp.catalogUuid = component.catalogUuid;
    }
    if (component.flexType) {
      comp.flexType = component.flexType;
    } else if (component.typeCode === JSP_INCLUDE_CMS_COMPONENT_TYPE) {
      comp.flexType = JSP_INCLUDE_CMS_COMPONENT_TYPE;
    } else {
      comp.flexType = component.typeCode;
    }
    return comp;
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

  private getComponents(pageData: CMSPage): CmsComponent[] {
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
