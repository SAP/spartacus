import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  GlobalMessageActions,
  normalizeHttpError,
  UserActions,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { map, concatMap, catchError } from 'rxjs/operators';
import { CdcUserConsentConnector } from '../connector/consent/cdc-user-consent.connector';

Injectable();
export class CdcUserConsentsEffects {
  giveCdcConsent$: Observable<
    UserActions.UserConsentsAction | GlobalMessageActions.RemoveMessagesByType
  > = createEffect(() =>
    this.actions$.pipe(
      ofType<UserActions.GiveUserConsent>(UserActions.GIVE_USER_CONSENT),
      concatMap((action) =>
        this.cdcUserConsentConnector
          .updateCdcConsent(
            action.payload.userId,
            true,
            action.payload.consentTemplateId ?? ''
          )
          .pipe(
            map((consent) => new UserActions.GiveUserConsentSuccess(consent)),
            catchError((error) => {
              const errors: Array<
                | UserActions.UserConsentsAction
                | GlobalMessageActions.RemoveMessagesByType
              > = [
                new UserActions.GiveUserConsentFail(normalizeHttpError(error)),
              ];
              return of(...errors);
            })
          )
      )
    )
  );

  withdrawCdcConsent$: Observable<UserActions.UserConsentsAction> =
    createEffect(() =>
      this.actions$.pipe(
        ofType(UserActions.WITHDRAW_USER_CONSENT_SUCCESS),
        map((action: UserActions.WithdrawUserConsent) => action.payload),
        concatMap(({ userId, consentCode }) =>
          this.cdcUserConsentConnector
            .updateCdcConsent(userId, false, consentCode)
            .pipe(
              map(() => new UserActions.WithdrawUserConsentSuccess()),
              catchError((error) =>
                of(
                  new UserActions.WithdrawUserConsentFail(
                    normalizeHttpError(error)
                  )
                )
              )
            )
        )
      )
    );
  constructor(
    private actions$: Actions,
    protected cdcUserConsentConnector: CdcUserConsentConnector
  ) {}
}
