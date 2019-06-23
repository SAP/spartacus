import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { LOGIN, LOGOUT } from '../../../auth/store/actions/login-logout.action';
import { LANGUAGE_CHANGE } from '../../../site-context/store/actions/languages.action';
import { CmsRoute } from '../../models/cms-route';
import * as RouterActions from '../actions/router.action';

@Injectable()
export class RouterEffects {
  @Effect({ dispatch: false })
  navigate$: Observable<any> = this.actions$.pipe(
    ofType(RouterActions.ROUTER_GO),
    map((action: RouterActions.RouteGoAction) => action.payload),
    tap(({ path, query: queryParams, extras }) => {
      this.router.navigate(path, { queryParams, ...extras });
    })
  );

  @Effect({ dispatch: false })
  navigateBuUrl$: Observable<any> = this.actions$.pipe(
    ofType(RouterActions.ROUTER_GO_BY_URL),
    map((action: RouterActions.RouteGoAction) => action.payload),
    tap(url => {
      this.router.navigateByUrl(url);
    })
  );

  @Effect({ dispatch: false })
  clearCmsRoutes$: Observable<Action> = this.actions$.pipe(
    ofType(LANGUAGE_CHANGE, LOGOUT, LOGIN),
    tap(_ => {
      const filteredConfig = this.router.config.filter(
        (route: CmsRoute) => !(route.data && route.data.cxCmsRouteContext)
      );
      if (filteredConfig.length !== this.router.config.length) {
        this.router.resetConfig(filteredConfig);
      }
    })
  );

  @Effect({ dispatch: false })
  navigateBack$: Observable<Action> = this.actions$.pipe(
    ofType(RouterActions.ROUTER_BACK),
    tap(() => this.location.back())
  );

  @Effect({ dispatch: false })
  navigateForward$: Observable<Action> = this.actions$.pipe(
    ofType(RouterActions.ROUTER_FORWARD),
    tap(() => this.location.forward())
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location
  ) {}
}
