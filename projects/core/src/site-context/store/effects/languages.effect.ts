import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { makeErrorSerializable } from '../../../util/serialization-utils';
import { WindowRef } from '../../../window/window-ref';
import { SiteConnector } from '../../connectors/site.connector';
import * as actions from '../actions/languages.action';

@Injectable()
export class LanguagesEffects {
  @Effect()
  loadLanguages$: Observable<
    actions.LoadLanguagesSuccess | actions.LoadLanguagesFail
  > = this.actions$.pipe(
    ofType(actions.LOAD_LANGUAGES),
    exhaustMap(() => {
      return this.siteConnector.getLanguages().pipe(
        map(languages => new actions.LoadLanguagesSuccess(languages)),
        catchError(error =>
          of(new actions.LoadLanguagesFail(makeErrorSerializable(error)))
        )
      );
    })
  );

  @Effect()
  activateLanguage$: Observable<actions.LanguageChange> = this.actions$.pipe(
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
