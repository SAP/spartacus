import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { makeErrorSerializable } from '../../../util/serialization-utils';
import { UserConsentConnector } from '../../connectors/consent/user-consent.connector';
import * as fromActions from '../actions/user-consents.action';

@Injectable()
export class UserConsentsEffect {
  @Effect()
  getConsents$: Observable<fromActions.UserConsentsAction> = this.actions$.pipe(
    ofType(fromActions.LOAD_USER_CONSENTS),
    map((action: fromActions.LoadUserConsents) => action.payload),
    switchMap(userId =>
      this.userConsentConnector.loadConsents(userId).pipe(
        map(consents => new fromActions.LoadUserConsentsSuccess(consents)),
        catchError(error =>
          of(new fromActions.LoadUserConsentsFail(makeErrorSerializable(error)))
        )
      )
    )
  );

  @Effect()
  giveConsent$: Observable<fromActions.UserConsentsAction> = this.actions$.pipe(
    ofType(fromActions.GIVE_USER_CONSENT),
    map((action: fromActions.GiveUserConsent) => action.payload),
    switchMap(({ userId, consentTemplateId, consentTemplateVersion }) =>
      this.userConsentConnector
        .giveConsent(userId, consentTemplateId, consentTemplateVersion)
        .pipe(
          map(consent => new fromActions.GiveUserConsentSuccess(consent)),
          catchError(error =>
            of(
              new fromActions.GiveUserConsentFail(makeErrorSerializable(error))
            )
          )
        )
    )
  );

  @Effect()
  withdrawConsent$: Observable<
    fromActions.UserConsentsAction
  > = this.actions$.pipe(
    ofType(fromActions.WITHDRAW_USER_CONSENT),
    map((action: fromActions.WithdrawUserConsent) => action.payload),
    switchMap(({ userId, consentCode }) =>
      this.userConsentConnector.withdrawConsent(userId, consentCode).pipe(
        map(_ => new fromActions.WithdrawUserConsentSuccess()),
        catchError(error =>
          of(
            new fromActions.WithdrawUserConsentFail(
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
