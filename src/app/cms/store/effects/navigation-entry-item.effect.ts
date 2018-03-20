import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, catchError, switchMap, filter, mergeMap } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import * as fromRouting from '../../../routing/store';

import * as navigationItemActions from '../actions/navigation-entry-item.action';
import * as fromServices from '../../services';
import { IdList } from '../../models/idList.model';

@Injectable()
export class NavigationEntryItemEffects {
  @Effect()
  loadComponent$: Observable<any> = this.actions$
    .ofType(navigationItemActions.LOAD_NAVIGATION_ITEMS)
    .pipe(
      map(
        (action: navigationItemActions.LoadNavigationItems) => action.payload
      ),
      map(itemList => this.getIdListByItemType(itemList)),
      switchMap(ids => {
        if (ids.componentIds.idList.length > 0) {
          return this.routingStore
            .select(fromRouting.getRouterState)
            .pipe(
              filter(routerState => routerState !== undefined),
              map(routerState => routerState.state.context),
              mergeMap(pageContext =>
                this.occCmsService
                  .loadListComponents(ids.componentIds, pageContext)
                  .pipe(
                    map(
                      data =>
                        new navigationItemActions.LoadNavigationItemsSuccess(
                          data
                        )
                    ),
                    catchError(error =>
                      of(
                        new navigationItemActions.LoadNavigationItemsFail(error)
                      )
                    )
                  )
              )
            );
        } else if (ids.pageIds.idList.length > 0) {
          // future work
          // dispatch action to load cms page one by one
        } else if (ids.mediaIds.idList.length > 0) {
          // future work
          // send request to get list of media
        }
      })
    );

  // We only consider 3 item types: cms page, cms component, and media.
  getIdListByItemType(itemList: any[]) {
    const pageIds: IdList = { idList: [] };
    const componentIds: IdList = { idList: [] };
    const mediaIds: IdList = { idList: [] };

    itemList.forEach(item => {
      if (item.superType === 'AbstractCMSComponent') {
        pageIds.idList.push(item.id);
      } else if (item.superType === 'AbstractPage') {
        componentIds.idList.push(item.id);
      } else if (item.superType === 'AbstractMedia') {
        mediaIds.idList.push(item.id);
      }
    });
    return { pageIds: pageIds, componentIds: componentIds, mediaIds: mediaIds };
  }

  constructor(
    private actions$: Actions,
    private occCmsService: fromServices.OccCmsService,
    private routingStore: Store<fromRouting.State>
  ) {}
}
