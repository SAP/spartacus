import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, catchError, tap, exhaustMap } from 'rxjs/operators';

import { OccSiteService } from '../../occ/occ-site.service';
import * as actions from '../actions/languages.action';
import { WindowRef } from '../../../window/window-ref';

@Injectable()
export class LanguagesEffects {
  @Effect()
  loadLanguages$: Observable<any> = this.actions$.pipe(
    ofType(actions.LOAD_LANGUAGES),
    exhaustMap(() => {
      return this.occSiteService.loadLanguages().pipe(
        map(data => new actions.LoadLanguagesSuccess(data.languages)),
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
    private occSiteService: OccSiteService,
    private winRef: WindowRef
  ) {}
}
