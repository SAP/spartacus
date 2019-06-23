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
import { LOGIN, LOGOUT } from '../../../auth/store/actions/login-logout.action';
import { RoutingService } from '../../../routing/index';
import { LANGUAGE_CHANGE } from '../../../site-context/store/actions/languages.action';
import { makeErrorSerializable } from '../../../util/serialization-utils';
import { CmsPageConnector } from '../../connectors/page/cms-page.connector';
import { CmsStructureModel } from '../../model/page.model';
import * as componentActions from '../actions/component.action';
import * as pageActions from '../actions/page.action';

@Injectable()
export class PageEffects {
  @Effect()
  refreshPage$: Observable<Action> = this.actions$.pipe(
    ofType(LANGUAGE_CHANGE, LOGOUT, LOGIN),
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
        mergeMap(context => of(new pageActions.LoadPageData(context)))
      )
    )
  );

  @Effect()
  loadPageData$: Observable<Action> = this.actions$.pipe(
    ofType(pageActions.LOAD_PAGE_DATA),
    map((action: pageActions.LoadPageData) => action.payload),
    groupBy(pageContext => pageContext.type + pageContext.id),
    mergeMap(group =>
      group.pipe(
        switchMap(pageContext =>
          this.cmsPageConnector.get(pageContext).pipe(
            mergeMap((cmsStructure: CmsStructureModel) => {
              return [
                new componentActions.GetComponentFromPage(
                  cmsStructure.components
                ),
                new pageActions.LoadPageDataSuccess(
                  pageContext,
                  cmsStructure.page
                ),
              ];
            }),
            catchError(error =>
              of(
                new pageActions.LoadPageDataFail(
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
