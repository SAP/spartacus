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
  take,
} from 'rxjs/operators';

import * as componentActions from '../actions/component.action';
import * as pageActions from '../actions/page.action';

import { RoutingService } from '../../../routing/index';
import { LOGIN, LOGOUT } from '../../../auth/store/actions/login-logout.action';
import { LANGUAGE_CHANGE } from '../../../site-context/store/actions/languages.action';
import { CmsPageLoader } from '../../services/cms-page.loader';
import { CmsStructureModel } from '../../model/page.model';

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
    switchMap(pageContext => {
      return this.cmsPageLoader.get(pageContext).pipe(
        mergeMap((cmsStructure: CmsStructureModel) => {
          return [
            new pageActions.LoadPageDataSuccess(pageContext, cmsStructure.page),
            new componentActions.GetComponentFromPage(cmsStructure.components),
          ];
        }),
        catchError(error => {
          return of(new pageActions.LoadPageDataFail(pageContext, error));
        })
      );
    })
  );

  constructor(
    private actions$: Actions,
    private cmsPageLoader: CmsPageLoader<any>,
    private routingService: RoutingService
  ) {}
}
