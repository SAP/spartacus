import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY, Observable, of } from 'rxjs';
import {
  catchError,
  concatMap,
  filter,
  map,
  withLatestFrom,
} from 'rxjs/operators';
import { AuthActions, AuthService } from '../../../auth/index';
import { GlobalMessageActions } from '../../../global-message/store/actions/index';
import { ANONYMOUS_CONSENT_STATUS } from '../../../model/consent.model';
import { SiteContextActions } from '../../../site-context/index';
import { UserActions } from '../../../user/store/actions/index';
import { makeErrorSerializable } from '../../../util/serialization-utils';
import { AnonymousConsentsConfig } from '../../config/anonymous-consents-config';
import { AnonymousConsentTemplatesConnector } from '../../connectors/anonymous-consent-templates.connector';
import { AnonymousConsentsService } from '../../facade';
import { AnonymousConsentsActions } from '../actions/index';

@Injectable()
export class AnonymousConsentsEffects {
  @Effect()
  handleLanguageChange$: Observable<
    AnonymousConsentsActions.LoadAnonymousConsentTemplates
  > = this.actions$.pipe(
    ofType(SiteContextActions.LANGUAGE_CHANGE),
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
          map(
            consentTemplates =>
              new AnonymousConsentsActions.LoadAnonymousConsentTemplatesSuccess(
                consentTemplates
              )
          ),
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

  @Effect()
  transferAnonymousConsentsToUser$: Observable<
    | UserActions.GiveUserAnonymousConsent
    | Observable<never>
    | GlobalMessageActions.RemoveMessagesByType
  > = this.actions$.pipe(
    ofType<AuthActions.LoadClientTokenSuccess>(
      AuthActions.LOAD_USER_TOKEN_SUCCESS
    ),
    withLatestFrom(
      this.actions$.pipe(
        ofType<UserActions.RegisterUserSuccess>(
          UserActions.REGISTER_USER_SUCCESS
        )
      )
    ),
    filter(([, registerAction]) => Boolean(registerAction)),
    concatMap(() =>
      this.anonymousConsentsService
        .getAnonymousConsentTemplate(
          this.anonymousConsentsConfig.anonymousConsents.registerConsent
        )
        .pipe(
          withLatestFrom(
            this.anonymousConsentsService.getAnonymousConsent(
              this.anonymousConsentsConfig.anonymousConsents.registerConsent
            ),
            this.authService.getOccUserId()
          ),
          map(([template, consent, userId]) => {
            console.log('in');
            if (
              consent.consentState ===
              ANONYMOUS_CONSENT_STATUS.ANONYMOUS_CONSENT_GIVEN
            ) {
              return new UserActions.GiveUserAnonymousConsent({
                userId: userId,
                consentTemplateId: template.id,
                consentTemplateVersion: template.version,
              });
            }
            return EMPTY;
          })
        )
    )
  );

  constructor(
    private actions$: Actions,
    private anonymousConsentTemplatesConnector: AnonymousConsentTemplatesConnector,
    private authService: AuthService,
    private anonymousConsentsService: AnonymousConsentsService,
    private anonymousConsentsConfig: AnonymousConsentsConfig
  ) {}
}
