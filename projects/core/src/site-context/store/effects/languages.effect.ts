import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { makeHttpErrorSerializable } from '../../../util/serialization-utils';
import { WindowRef } from '../../../window/window-ref';
import { SiteConnector } from '../../connectors/site.connector';
import * as actions from '../actions/languages.action';

@Injectable()
export class LanguagesEffects {
  @Effect()
  loadLanguages$: Observable<Action> = this.actions$.pipe(
    ofType(actions.LOAD_LANGUAGES),
    exhaustMap(() => {
      return this.siteConnector.getLanguages().pipe(
        map(languages => new actions.LoadLanguagesSuccess(languages)),
        catchError(error =>
          of(new actions.LoadLanguagesFail(makeHttpErrorSerializable(error)))
        )
      );
    })
  );

  @Effect()
  activateLanguage$: Observable<Action> = this.actions$.pipe(
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
