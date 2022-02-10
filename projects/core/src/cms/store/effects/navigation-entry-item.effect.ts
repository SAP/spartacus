import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, mergeMap, take } from 'rxjs/operators';
import { RoutingService } from '../../../routing/index';
import { normalizeHttpError } from '../../../util/normalize-http-error';
import { isNotUndefined } from '../../../util/type-guards';
import { CmsComponentConnector } from '../../connectors/component/cms-component.connector';
import { CmsActions } from '../actions/index';

@Injectable()
export class NavigationEntryItemEffects {
  @Effect()
  loadNavigationItems$: Observable<
    | CmsActions.LoadCmsNavigationItemsSuccess
    | CmsActions.LoadCmsNavigationItemsFail
  > = this.actions$.pipe(
    ofType(CmsActions.LOAD_CMS_NAVIGATION_ITEMS),
    map((action: CmsActions.LoadCmsNavigationItems) => action.payload),
    map((payload) => {
      return {
        ids: this.getIdListByItemType(payload.items),
        nodeId: payload.nodeId,
      };
    }),
    mergeMap((data) => {
      if (data.ids.componentIds.length > 0) {
        return this.routingService.getRouterState().pipe(
          filter(isNotUndefined),
          map((routerState) => routerState.state.context),
          take(1),
          mergeMap((pageContext) =>
            // download all items in one request
            this.cmsComponentConnector
              .getList(data.ids.componentIds, pageContext)
              .pipe(
                map(
                  (components) =>
                    new CmsActions.LoadCmsNavigationItemsSuccess({
                      nodeId: data.nodeId,
                      components: components,
                    })
                ),
                catchError((error) =>
                  of(
                    new CmsActions.LoadCmsNavigationItemsFail(
                      data.nodeId,
                      normalizeHttpError(error)
                    )
                  )
                )
              )
          )
        );
      } else if (data.ids.pageIds.length > 0) {
        // TODO: future work
        // dispatch action to load cms page one by one
      } else if (data.ids.mediaIds.length > 0) {
        // TODO: future work
        // send request to get list of media
      } else {
        return of(
          new CmsActions.LoadCmsNavigationItemsFail(
            data.nodeId,
            'navigation nodes are empty'
          )
        );
      }
    })
  );

  // We only consider 3 item types: cms page, cms component, and media.
  getIdListByItemType(itemList: any[]): {
    pageIds: string[];
    componentIds: string[];
    mediaIds: string[];
  } {
    const pageIds: string[] = [];
    const componentIds: string[] = [];
    const mediaIds: string[] = [];

    itemList.forEach((item) => {
      if (item.superType === 'AbstractCMSComponent') {
        componentIds.push(item.id);
      } else if (item.superType === 'AbstractPage') {
        pageIds.push(item.id);
      } else if (item.superType === 'AbstractMedia') {
        mediaIds.push(item.id);
      }
    });
    return { pageIds: pageIds, componentIds: componentIds, mediaIds: mediaIds };
  }

  constructor(
    private actions$: Actions,
    private cmsComponentConnector: CmsComponentConnector,
    private routingService: RoutingService
  ) {}
}
