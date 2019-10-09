import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {} from 'projects/core/src/model';
import { Observable, of } from 'rxjs';
import {
  catchError,
  concatMap,
  filter,
  map,
  mergeMap,
  withLatestFrom,
} from 'rxjs/operators';
import { AuthActions, AuthService } from '../../../auth/index';
import { SiteContextActions } from '../../../site-context/index';
import { makeErrorSerializable } from '../../../util/serialization-utils';
import { AnonymousConsentTemplatesConnector } from '../../connectors/anonymous-consent-templates.connector';
import { AnonymousConsentsService } from '../../facade/index';
import { AnonymousConsentsActions } from '../actions/index';

@Injectable()
export class AnonymousConsentsEffects {
  @Effect()
  handleLogoutAndLanguageChange$: Observable<
    AnonymousConsentsActions.LoadAnonymousConsentTemplates
  > = this.actions$.pipe(
    ofType(SiteContextActions.LANGUAGE_CHANGE, AuthActions.LOGOUT),
    withLatestFrom(this.authService.isUserLoggedIn()),
    filter(([_, isUserLoggedIn]) => !isUserLoggedIn),
    map(_ => new AnonymousConsentsActions.LoadAnonymousConsentTemplates())
  );

  @Effect()
  loadAnonymousConsentTemplates$: Observable<
    AnonymousConsentsActions.AnonymousConsentsActions
  > = this.actions$.pipe(
    ofType(AnonymousConsentsActions.LOAD_ANONYMOUS_CONSENT_TEMPLATES),
    concatMap(_ =>
      this.anonymousConsentTemplatesConnector
        .loadAnonymousConsentTemplates()
        .pipe(
          withLatestFrom(
            this.anonymousConsentService.getAnonymousConsentTemplates()
          ),
          mergeMap(([newConsentTemplates, currentConsentTemplates]) => {
            let updated = false;
            if (
              Boolean(currentConsentTemplates) &&
              currentConsentTemplates.length !== 0
            ) {
              updated = this.anonymousConsentService.detectUpdatedTemplates(
                currentConsentTemplates,
                newConsentTemplates
              );
            }

            return [
              new AnonymousConsentsActions.LoadAnonymousConsentTemplatesSuccess(
                newConsentTemplates
              ),
              new AnonymousConsentsActions.ToggleAnonymousConsentTemplatesUpdated(
                updated
              ),
            ];
          }),
          catchError(error =>
            of(
              new AnonymousConsentsActions.LoadAnonymousConsentTemplatesFail(
                makeErrorSerializable(error)
              )
            )
          )
        )
    )
  );

  constructor(
    private actions$: Actions,
    private anonymousConsentTemplatesConnector: AnonymousConsentTemplatesConnector,
    private authService: AuthService,
    private anonymousConsentService: AnonymousConsentsService
  ) {}
}
