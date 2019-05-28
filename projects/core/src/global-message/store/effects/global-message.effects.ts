import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import * as GlobalMessageActions from '../actions/global-message.actions';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable()
export class GlobalMessageEffects {

  // @Effect({ dispatch: false })
  // navigate$: Observable<any> = this.actions$.pipe(
  //   ofType(RouterActions.GO),
  //   map((action: RouterActions.Go) => action.payload),
  //   tap(({ path, query: queryParams, extras }) => {
  //     this.router.navigate(path, { queryParams, ...extras });
  //   })
  // );

  // @Effect({ dispatch: false })
  timeout$: Observable<any> = this.actions$.pipe(
    ofType(GlobalMessageActions.ADD_MESSAGE),
    map((action: GlobalMessageActions.AddMessage) => action.payload),
    tap(({ path, query: queryParams, extras }) => {
      this.router.navigate(path, { queryParams, ...extras });
    })
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location
  ) {}
}
