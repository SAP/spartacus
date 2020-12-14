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
import { AuthActions } from '../../../auth/user-auth/store/actions/index';
import { RoutingService } from '../../../routing/index';
import { SiteContextActions } from '../../../site-context/store/actions/index';
import { normalizeHttpError } from '../../../util/normalize-http-error';
import { CmsPageConnector } from '../../connectors/page/cms-page.connector';
import { CmsStructureModel } from '../../model/page.model';
import { serializePageContext } from '../../utils/cms-utils';
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
    switchMap(() =>
      this.routingService.getRouterState().pipe(
        filter(
          (routerState) =>
            routerState &&
            routerState.state &&
            routerState.state.cmsRequired &&
            !routerState.nextState
        ),
        take(1),
        map((routerState) => routerState.state.context),
        mergeMap((context) => of(new CmsActions.LoadCmsPageData(context)))
      )
    )
  );

  @Effect()
  loadPageData$: Observable<Action> = this.actions$.pipe(
    ofType(CmsActions.LOAD_CMS_PAGE_DATA),
    map((action: CmsActions.LoadCmsPageData) => action.payload),
    groupBy((pageContext) => serializePageContext(pageContext)),
    mergeMap((group) =>
      group.pipe(
        switchMap((pageContext) =>
          this.cmsPageConnector.get(pageContext).pipe(
            mergeMap((cmsStructure: CmsStructureModel) => {
              const actions: Action[] = [
                new CmsActions.CmsGetComponentFromPage(
                  cmsStructure.components.map((component) => ({
                    component,
                    pageContext,
                  }))
                ),
                new CmsActions.LoadCmsPageDataSuccess(
                  pageContext,
                  cmsStructure.page
                ),
              ];

              const pageLabel = cmsStructure.page.label;
              // For content pages the page label returned from backend can be different than page ID initially assumed from route.
              // In such a case let's save the success response not only for initially assumed page ID, but also for correct page label.
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
            catchError((error) =>
              of(
                new CmsActions.LoadCmsPageDataFail(
                  pageContext,
                  normalizeHttpError(error)
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
