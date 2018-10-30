import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, catchError, switchMap, tap } from 'rxjs/operators';

import { OccSiteService } from '../../occ/occ-site.service';
import * as languagesActions from '../actions/languages.action';

@Injectable()
export class LanguagesEffects {
  @Effect()
  loadLanguages$: Observable<any> = this.actions$.pipe(
    ofType(languagesActions.LOAD_LANGUAGES),
    switchMap(() => {
      return this.occSiteService.loadLanguages().pipe(
        map(data => new languagesActions.LoadLanguagesSuccess(data.languages)),
        catchError(error => of(new languagesActions.LoadLanguagesFail(error)))
      );
    })
  );

  @Effect()
  activateLanguage$: Observable<any> = this.actions$.pipe(
    ofType(languagesActions.SET_ACTIVE_LANGUAGE),
    tap((action: languagesActions.SetActiveLanguage) => {
      if (sessionStorage) {
        sessionStorage.setItem('language', action.payload);
      }
    }),
    map(() => new languagesActions.LanguageChange())
  );

  constructor(
    private actions$: Actions,
    private occSiteService: OccSiteService
  ) {}
}
