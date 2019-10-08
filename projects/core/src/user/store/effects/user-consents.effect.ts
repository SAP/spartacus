import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  GlobalMessageActions,
  GlobalMessageType,
} from 'projects/core/src/global-message';
import { RemoveMessagesByType } from 'projects/core/src/global-message/store/actions/global-message.actions';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { SiteContextActions } from '../../../site-context/store/actions/index';
import { makeErrorSerializable } from '../../../util/serialization-utils';
import { UserConsentConnector } from '../../connectors/consent/user-consent.connector';
import { UserActions } from '../actions/index';

@Injectable()
export class UserConsentsEffect {
  @Effect()
  resetConsents$: Observable<
    UserActions.ResetLoadUserConsents
  > = this.actions$.pipe(
    ofType(SiteContextActions.LANGUAGE_CHANGE),
    map(() => new UserActions.ResetLoadUserConsents())
  );

  @Effect()
  getConsents$: Observable<UserActions.UserConsentsAction> = this.actions$.pipe(
    ofType(UserActions.LOAD_USER_CONSENTS),
    map((action: UserActions.LoadUserConsents) => action.payload),
    switchMap(userId =>
      this.userConsentConnector.loadConsents(userId).pipe(
        map(consents => new UserActions.LoadUserConsentsSuccess(consents)),
        catchError(error =>
          of(new UserActions.LoadUserConsentsFail(makeErrorSerializable(error)))
        )
      )
    )
  );

  @Effect()
  giveConsent$: Observable<
    UserActions.UserConsentsAction | RemoveMessagesByType
  > = this.actions$.pipe(
    ofType(
      UserActions.GIVE_USER_CONSENT,
      UserActions.GIVE_USER_ANONYMOUS_CONSENT
    ),
    map(
      (
        action:
          | UserActions.GiveUserConsent
          | UserActions.GiveUserAnonymousConsent
      ) => action
    ),
    switchMap(action =>
      this.userConsentConnector
        .giveConsent(
          action.payload.userId,
          action.payload.consentTemplateId,
          action.payload.consentTemplateVersion
        )
        .pipe(
          map(consent => new UserActions.GiveUserConsentSuccess(consent)),
          catchError(error => {
            if (
              action.type === UserActions.GIVE_USER_ANONYMOUS_CONSENT &&
              error.status === 409
            ) {
              return of(
                new GlobalMessageActions.RemoveMessagesByType(
                  GlobalMessageType.MSG_TYPE_ERROR
                ),
                new UserActions.GiveUserConsentFail(
                  makeErrorSerializable(error)
                )
              );
            }
            return of(
              new UserActions.GiveUserConsentFail(makeErrorSerializable(error))
            );
          })
        )
    )
  );

  @Effect()
  withdrawConsent$: Observable<
    UserActions.UserConsentsAction
  > = this.actions$.pipe(
    ofType(UserActions.WITHDRAW_USER_CONSENT),
    map((action: UserActions.WithdrawUserConsent) => action.payload),
    switchMap(({ userId, consentCode }) =>
      this.userConsentConnector.withdrawConsent(userId, consentCode).pipe(
        map(() => new UserActions.WithdrawUserConsentSuccess()),
        catchError(error =>
          of(
            new UserActions.WithdrawUserConsentFail(
              makeErrorSerializable(error)
            )
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private userConsentConnector: UserConsentConnector
  ) {}
}
