import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';

import * as languagesActions from '../actions/languages.action';
import { OccSiteService } from '../../../../occ/site-context/occ-site.service';

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

  constructor(
    private actions$: Actions,
    private occSiteService: OccSiteService
  ) {}
}
