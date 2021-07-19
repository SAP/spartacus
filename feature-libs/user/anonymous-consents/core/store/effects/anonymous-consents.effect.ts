import { Injectable, isDevMode } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  AuthActions,
  AuthService,
  normalizeHttpError,
  UserActions,
  UserConsentService,
  UserIdService,
} from '@spartacus/core';
import { EMPTY, Observable, of } from 'rxjs';
import {
  catchError,
  concatMap,
  filter,
  map,
  mergeMap,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { AnonymousConsentsConfig } from '../../config/anonymous-consents-config';
import { UserAnonymousConsentTemplatesConnector } from '../../connectors/user-anonymous-consent-templates.connector';
import { AnonymousConsentsService } from '../../facade/anonymous-consents.service';
import { AnonymousConsentsActions } from '../actions/index';

@Injectable()
export class AnonymousConsentsEffects {
  @Effect()
  checkConsentVersions$: Observable<
    | AnonymousConsentsActions.LoadAnonymousConsentTemplates
    | AnonymousConsentsActions.LoadAnonymousConsentTemplatesFail
    | Observable<never>
  > = this.actions$.pipe(
    ofType(AnonymousConsentsActions.ANONYMOUS_CONSENT_CHECK_UPDATED_VERSIONS),
    switchMap((action) =>
      of(action).pipe(
        withLatestFrom(this.anonymousConsentService.getConsents())
      )
    ),
    concatMap(([_, currentConsents]) => {
      return this.userAnonymousConsentTemplatesConnector
        .loadAnonymousConsents()
        .pipe(
          map((newConsents) => {
            if (!newConsents) {
              if (isDevMode()) {
                console.warn(
                  'No consents were loaded. Please check the Spartacus documentation as this could be a back-end configuration issue.'
                );
              }
              return false;
            }

            const currentConsentVersions = currentConsents.map(
              (consent) => consent.templateVersion ?? 0
            );
            const newConsentVersions = newConsents.map(
              (consent) => consent.templateVersion ?? 0
            );

            return this.detectUpdatedVersion(
              currentConsentVersions,
              newConsentVersions
            );
          }),
          switchMap((updated) =>
            updated
              ? of(new AnonymousConsentsActions.LoadAnonymousConsentTemplates())
              : EMPTY
          ),
          catchError((error) =>
            of(
              new AnonymousConsentsActions.LoadAnonymousConsentTemplatesFail(
                normalizeHttpError(error)
              )
            )
          )
        );
    })
  );

  @Effect()
  loadAnonymousConsentTemplates$: Observable<AnonymousConsentsActions.AnonymousConsentsActions> = this.actions$.pipe(
    ofType(AnonymousConsentsActions.LOAD_ANONYMOUS_CONSENT_TEMPLATES),
    switchMap((action) =>
      of(action).pipe(
        withLatestFrom(this.anonymousConsentService.getTemplates())
      )
    ),
    concatMap(([_, currentConsentTemplates]) =>
      this.userAnonymousConsentTemplatesConnector
        .loadAnonymousConsentTemplates()
        .pipe(
          mergeMap((newConsentTemplates) => {
            let updated = false;
            if (
              currentConsentTemplates &&
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
          catchError((error) =>
            of(
              new AnonymousConsentsActions.LoadAnonymousConsentTemplatesFail(
                normalizeHttpError(error)
              )
            )
          )
        )
    )
  );

  // TODO(#9416): This won't work with flow different than `Resource Owner Password Flow` which involves redirect (maybe in popup in will work)
  @Effect()
  transferAnonymousConsentsToUser$: Observable<
    UserActions.TransferAnonymousConsent | Observable<never>
  > = this.actions$.pipe(
    ofType<AuthActions.Login>(AuthActions.LOGIN),
    filter(() => Boolean(this.anonymousConsentsConfig.anonymousConsents)),
    withLatestFrom(
      this.actions$.pipe(
        ofType<UserActions.RegisterUserSuccess>(
          UserActions.REGISTER_USER_SUCCESS
        )
      )
    ),
    filter(([, registerAction]) => Boolean(registerAction)),
    switchMap(() =>
      this.anonymousConsentService.getConsents().pipe(
        withLatestFrom(
          this.userIdService.getUserId(),
          this.anonymousConsentService.getTemplates(),
          this.authService.isUserLoggedIn()
        ),
        filter(([, , , loggedIn]) => loggedIn),
        concatMap(([consents, userId, templates, _loggedIn]) => {
          const actions: UserActions.TransferAnonymousConsent[] = [];
          for (const consent of consents) {
            if (
              this.anonymousConsentService.isConsentGiven(consent) &&
              !this.anonymousConsentsConfig.anonymousConsents?.requiredConsents?.includes(
                consent.templateCode
              )
            ) {
              for (const template of templates) {
                if (template.id === consent.templateCode) {
                  actions.push(
                    new UserActions.TransferAnonymousConsent({
                      userId,
                      consentTemplateId: template.id,
                      consentTemplateVersion: template.version,
                    })
                  );
                  break;
                }
              }
            }
          }
          if (actions.length > 0) {
            return actions;
          }
          return EMPTY;
        })
      )
    )
  );

  @Effect()
  giveRequiredConsentsToUser$: Observable<
    UserActions.GiveUserConsent | Observable<never>
  > = this.actions$.pipe(
    ofType<AuthActions.Login>(AuthActions.LOGIN),
    filter(
      (action) =>
        !!this.anonymousConsentsConfig.anonymousConsents?.requiredConsents &&
        !!action
    ),
    concatMap(() =>
      this.userConsentService.getConsentsResultSuccess().pipe(
        withLatestFrom(
          this.userIdService.getUserId(),
          this.userConsentService.getConsents(),
          this.authService.isUserLoggedIn()
        ),
        filter(([, , , loggedIn]) => loggedIn),
        tap(([loaded, _userId, _templates, _loggedIn]) => {
          if (!loaded) {
            this.userConsentService.loadConsents();
          }
        }),
        map(([_loaded, userId, templates, _loggedIn]) => {
          return { userId, templates };
        }),
        concatMap(({ userId, templates }) => {
          const actions: UserActions.GiveUserConsent[] = [];
          for (const template of templates) {
            if (
              this.userConsentService.isConsentWithdrawn(
                template.currentConsent
              ) &&
              this.anonymousConsentsConfig.anonymousConsents?.requiredConsents?.includes(
                template.id
              )
            ) {
              actions.push(
                new UserActions.GiveUserConsent({
                  userId,
                  consentTemplateId: template.id,
                  consentTemplateVersion: template.version,
                })
              );
            }
          }
          if (actions.length > 0) {
            return actions;
          }
          return EMPTY;
        })
      )
    )
  );

  constructor(
    private actions$: Actions,
    private userAnonymousConsentTemplatesConnector: UserAnonymousConsentTemplatesConnector,
    private authService: AuthService,
    private anonymousConsentsConfig: AnonymousConsentsConfig,
    private anonymousConsentService: AnonymousConsentsService,
    private userConsentService: UserConsentService,
    private userIdService: UserIdService
  ) {}

  /**
   * Compares the given versions and determines if there's a mismatch,
   * in which case `true` is returned.
   *
   * @param currentVersions versions of the current consents
   * @param newVersions versions of the new consents
   */
  private detectUpdatedVersion(
    currentVersions: number[],
    newVersions: number[]
  ): boolean {
    if (currentVersions.length !== newVersions.length) {
      return true;
    }

    for (let i = 0; i < newVersions.length; i++) {
      if (currentVersions[i] !== newVersions[i]) {
        return true;
      }
    }

    return false;
  }
}
