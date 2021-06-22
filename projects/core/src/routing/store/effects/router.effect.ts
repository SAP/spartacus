import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthActions } from '../../../auth/user-auth/store/actions/index';
import { SiteContextActions } from '../../../site-context/store/actions/index';
import { CmsRoute } from '../../models/cms-route';

@Injectable()
export class RouterEffects {
  @Effect({ dispatch: false })
  clearCmsRoutes$: Observable<Action> = this.actions$.pipe(
    ofType(
      SiteContextActions.LANGUAGE_CHANGE,
      AuthActions.LOGOUT,
      AuthActions.LOGIN
    ),
    tap(() => {
      const filteredConfig = this.router.config.filter(
        (route: CmsRoute) => !(route.data && route.data.cxCmsRouteContext)
      );
      if (filteredConfig.length !== this.router.config.length) {
        this.router.resetConfig(filteredConfig);
      }
    })
  );

  constructor(private actions$: Actions, private router: Router) {}
}
