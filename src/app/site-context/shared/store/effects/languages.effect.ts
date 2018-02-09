import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { map, catchError, switchMap } from 'rxjs/operators';

import * as languagesActions from '../actions/languages.action';
import { OccSiteService } from '../../../../newocc/site-context/occ-site.service';

@Injectable()
export class LanguagesEffects {
  @Effect()
  loadLanguages$: Observable<any> = this.actions$
    .ofType(languagesActions.LOAD_LANGUAGES)
    .pipe(
      switchMap(() => {
        return this.occSiteService
          .loadLanguages()
          .pipe(
            map(
              data => new languagesActions.LoadLanguagesSuccess(data.languages)
            ),
            catchError(error =>
              of(new languagesActions.LoadLanguagesFail(error))
            )
          );
      })
    );

  constructor(
    private actions$: Actions,
    private occSiteService: OccSiteService
  ) {}
}
