import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CdcSiteConsentService } from '@spartacus/cdc/components';
import { UserActions, normalizeHttpError, GlobalMessageActions,
  //GlobalMessageActions
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { map, catchError, concatMap } from 'rxjs/operators';

@Injectable()
export class CdcUserConsentsEffects {
  constructor(
    protected actions$: Actions,
    protected cdcUserConsentService: CdcSiteConsentService
  ) {}

  getConsents$: Observable<UserActions.UserConsentsAction> = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.LOAD_USER_CONSENTS),
      map((action: UserActions.LoadUserConsents) => action.payload),
      concatMap(() =>
        this.cdcUserConsentService.getSiteConsentDetails().pipe(
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
      ofType<UserActions.GiveUserConsent>(UserActions.GIVE_USER_CONSENT),
      concatMap((action) =>
      this.cdcUserConsentService.updateConsent(
            true,
            action.payload.consentTemplateId ?? '',
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

  withdrawConsent$: Observable<UserActions.UserConsentsAction> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.WITHDRAW_USER_CONSENT),
        map((action: UserActions.WithdrawUserConsent) => action.payload),
        concatMap(({ consentCode }) =>
          this.cdcUserConsentService.updateConsent(false,consentCode).pipe(
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

}
