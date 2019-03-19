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

import { RoutingService } from '../../../routing/index';
import { LOGIN, LOGOUT } from '../../../auth/store/actions/login-logout.action';
import { LANGUAGE_CHANGE } from '../../../site-context/store/actions/languages.action';
import { CmsLoader } from '../../services/cms.loader';

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
      this.cmsLoader.get(pageContext).pipe(
        mergeMap((pageStructure: any) => {
          return [
            new pageActions.LoadPageDataSuccess(
              pageContext,
              pageStructure.page
            ),
            new componentActions.GetComponentFromPage(pageStructure.components)
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
    private cmsLoader: CmsLoader,
    private routingService: RoutingService
  ) {}
}
