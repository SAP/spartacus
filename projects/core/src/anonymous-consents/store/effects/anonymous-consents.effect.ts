import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY, Observable, of } from 'rxjs';
import {
  catchError,
  concatMap,
  filter,
  map,
  mergeMap,
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

  @Effect()
  transferAnonymousConsentsToUser$: Observable<
    | UserActions.GiveUserAnonymousConsent
    | Observable<never>
    | GlobalMessageActions.RemoveMessagesByType
  > = this.actions$.pipe(
    filter(
      () =>
        Boolean(this.anonymousConsentsConfig.anonymousConsents) &&
        Boolean(this.anonymousConsentsConfig.anonymousConsents.registerConsent)
    ),
    ofType<AuthActions.LoadUserTokenSuccess>(
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
      this.anonymousConsentService
        .getAnonymousConsentTemplate(
          this.anonymousConsentsConfig.anonymousConsents.registerConsent
        )
        .pipe(
          withLatestFrom(
            this.anonymousConsentService.getAnonymousConsent(
              this.anonymousConsentsConfig.anonymousConsents.registerConsent
            ),
            this.authService.getOccUserId()
          ),
          map(([template, consent, userId]) => {
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
    private anonymousConsentsConfig: AnonymousConsentsConfig,
    private anonymousConsentService: AnonymousConsentsService
  ) {}
}
