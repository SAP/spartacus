import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { makeErrorSerializable } from '../../../util/serialization-utils';
import { WindowRef } from '../../../window/window-ref';
import { SiteConnector } from '../../connectors/site.connector';
import { SiteContextActions } from '../actions/index';

@Injectable()
export class LanguagesEffects {
  @Effect()
  loadLanguages$: Observable<
    | SiteContextActions.LoadLanguagesSuccess
    | SiteContextActions.LoadLanguagesFail
  > = this.actions$.pipe(
    ofType(SiteContextActions.LOAD_LANGUAGES),
    exhaustMap(() => {
      return this.siteConnector.getLanguages().pipe(
        map(
          (languages) => new SiteContextActions.LoadLanguagesSuccess(languages)
        ),
        catchError((error) =>
          of(
            new SiteContextActions.LoadLanguagesFail(
              makeErrorSerializable(error)
            )
          )
        )
      );
    })
  );

  @Effect()
  activateLanguage$: Observable<
    SiteContextActions.LanguageChange
  > = this.actions$.pipe(
    ofType(SiteContextActions.SET_ACTIVE_LANGUAGE),
    tap((action: SiteContextActions.SetActiveLanguage) => {
      if (this.winRef.sessionStorage) {
        this.winRef.sessionStorage.setItem('language', action.payload);
      }
    }),
    map(() => new SiteContextActions.LanguageChange())
  );

  constructor(
    private actions$: Actions,
    private siteConnector: SiteConnector,
    private winRef: WindowRef
  ) {}
}
