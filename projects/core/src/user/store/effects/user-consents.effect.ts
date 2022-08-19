/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { GlobalMessageType } from '../../../global-message/models/global-message.model';
import { GlobalMessageActions } from '../../../global-message/store/actions';
import { SiteContextActions } from '../../../site-context/store/actions/index';
import { normalizeHttpError } from '../../../util/normalize-http-error';
import { UserConsentConnector } from '../../connectors/consent/user-consent.connector';
import { UserActions } from '../actions/index';

@Injectable()
export class UserConsentsEffect {
  resetConsents$: Observable<UserActions.ResetLoadUserConsents> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SiteContextActions.LANGUAGE_CHANGE),
        map(() => new UserActions.ResetLoadUserConsents())
      )
  );

  getConsents$: Observable<UserActions.UserConsentsAction> = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.LOAD_USER_CONSENTS),
      map((action: UserActions.LoadUserConsents) => action.payload),
      concatMap((userId) =>
        this.userConsentConnector.loadConsents(userId).pipe(
          map((consents) => new UserActions.LoadUserConsentsSuccess(consents)),
          catchError((error) =>
            of(new UserActions.LoadUserConsentsFail(normalizeHttpError(error)))
          )
        )
      )
    )
  );

  giveConsent$: Observable<
    UserActions.UserConsentsAction | GlobalMessageActions.RemoveMessagesByType
  > = createEffect(() =>
    this.actions$.pipe(
      ofType<
        UserActions.GiveUserConsent | UserActions.TransferAnonymousConsent
      >(UserActions.GIVE_USER_CONSENT, UserActions.TRANSFER_ANONYMOUS_CONSENT),
      concatMap((action) =>
        this.userConsentConnector
          .giveConsent(
            action.payload.userId,
            action.payload.consentTemplateId ?? '',
            action.payload.consentTemplateVersion ?? 0
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
              if (
                action.type === UserActions.TRANSFER_ANONYMOUS_CONSENT &&
                error.status === 409
              ) {
                errors.push(
                  new GlobalMessageActions.RemoveMessagesByType(
                    GlobalMessageType.MSG_TYPE_ERROR
                  )
                );
              }
              return of(...errors);
            })
          )
      )
    )
  );

  withdrawConsent$: Observable<UserActions.UserConsentsAction> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.WITHDRAW_USER_CONSENT),
        map((action: UserActions.WithdrawUserConsent) => action.payload),
        concatMap(({ userId, consentCode }) =>
          this.userConsentConnector.withdrawConsent(userId, consentCode).pipe(
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
    private userConsentConnector: UserConsentConnector
  ) {}
}
