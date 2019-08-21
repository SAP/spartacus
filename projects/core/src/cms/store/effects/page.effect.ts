import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import {
  catchError,
  filter,
  groupBy,
  map,
  mergeMap,
  switchMap,
  take,
} from 'rxjs/operators';
import { AuthActions } from '../../../auth/store/actions/index';
import { RoutingService } from '../../../routing/index';
import { SiteContextActions } from '../../../site-context/store/actions/index';
import { makeErrorSerializable } from '../../../util/serialization-utils';
import { CmsPageConnector } from '../../connectors/page/cms-page.connector';
import { CmsStructureModel } from '../../model/page.model';
import { CmsActions } from '../actions/index';

@Injectable()
export class PageEffects {
  @Effect()
  refreshPage$: Observable<Action> = this.actions$.pipe(
    ofType(
      SiteContextActions.LANGUAGE_CHANGE,
      AuthActions.LOGOUT,
      AuthActions.LOGIN
    ),
    switchMap(_ =>
      this.routingService.getRouterState().pipe(
        take(1),
        filter(
          routerState =>
            routerState &&
            routerState.state &&
            routerState.state.cmsRequired &&
            !routerState.nextState
        ),
        map(routerState => routerState.state.context),
        mergeMap(context => of(new CmsActions.LoadCmsPageData(context)))
      )
    )
  );

  @Effect()
  loadPageData$: Observable<Action> = this.actions$.pipe(
    ofType(CmsActions.LOAD_CMS_PAGE_DATA),
    map((action: CmsActions.LoadCmsPageData) => action.payload),
    groupBy(pageContext => pageContext.type + pageContext.id),
    mergeMap(group =>
      group.pipe(
        switchMap(pageContext =>
          this.cmsPageConnector.get(pageContext).pipe(
            mergeMap((cmsStructure: CmsStructureModel) => {
              const actions: Action[] = [
                new CmsActions.CmsGetComponentFromPage(cmsStructure.components),
                new CmsActions.LoadCmsPageDataSuccess(
                  pageContext,
                  cmsStructure.page
                ),
              ];

              const pageLabel = cmsStructure.page.label;
              // for content pages the page label returned from backend can be different than page ID initially assumed from route
              // so let's save the success response not only for initially assumed page ID, but also for correct page label
              if (pageLabel && pageLabel !== pageContext.id) {
                actions.unshift(
                  new CmsActions.CmsSetPageSuccessIndex(
                    { id: pageLabel, type: pageContext.type },
                    cmsStructure.page
                  )
                );
              }

              return actions;
            }),
            catchError(error =>
              of(
                new CmsActions.LoadCmsPageDataFail(
                  pageContext,
                  makeErrorSerializable(error)
                )
              )
            )
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private cmsPageConnector: CmsPageConnector,
    private routingService: RoutingService
  ) {}
}
