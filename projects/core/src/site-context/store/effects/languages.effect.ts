import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, catchError, tap, exhaustMap } from 'rxjs/operators';

import * as actions from '../actions/languages.action';
import { WindowRef } from '../../../window/window-ref';
import { SiteConnector } from '../../connectors/site.connector';

@Injectable()
export class LanguagesEffects {
  @Effect()
  loadLanguages$: Observable<any> = this.actions$.pipe(
    ofType(actions.LOAD_LANGUAGES),
    exhaustMap(() => {
      return this.siteConnector.getLanguages().pipe(
        map(languages => new actions.LoadLanguagesSuccess(languages)),
        catchError(error => of(new actions.LoadLanguagesFail(error)))
      );
    })
  );

  @Effect()
  activateLanguage$: Observable<any> = this.actions$.pipe(
    ofType(actions.SET_ACTIVE_LANGUAGE),
    tap((action: actions.SetActiveLanguage) => {
      if (this.winRef.sessionStorage) {
        this.winRef.sessionStorage.setItem('language', action.payload);
      }
    }),
    map(() => new actions.LanguageChange())
  );

  constructor(
    private actions$: Actions,
    private siteConnector: SiteConnector,
    private winRef: WindowRef
  ) {}
}
