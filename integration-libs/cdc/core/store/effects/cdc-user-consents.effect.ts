import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  GlobalMessageService,
  GlobalMessageType,
  UserActions,
} from '@spartacus/core';
import { map, mergeMap, tap } from 'rxjs/operators';
import { CdcUserConsentConnector } from '../connector/consent/cdc-user-consent.connector';

@Injectable()
export class CdcUserConsentsEffects {
  loadCdcConsents$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType<UserActions.LoadUserConsentsSuccess>(
          UserActions.LOAD_USER_CONSENTS_SUCCESS
        ),
        mergeMap(() => this.cdcUserConsentConnector.loadCdcSiteConsents()),
        tap({ error: (error) => this.showErrorMessage(error) })
      ),
    { dispatch: false }
  );
  giveCdcConsent$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType<UserActions.GiveUserConsentSuccess>(
          UserActions.GIVE_USER_CONSENT_SUCCESS
        ),
        mergeMap((action) =>
          this.cdcUserConsentConnector.updateCdcConsent(
            true,
            action.consentTemplate?.id ?? ''
          )
        ),
        tap({ error: (error) => this.showErrorMessage(error) })
      ),
    { dispatch: false }
  );

  withdrawCdcConsent$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.WITHDRAW_USER_CONSENT_SUCCESS),
        map((action: UserActions.WithdrawUserConsentSuccess) => action.payload),
        mergeMap((consentId) =>
          this.cdcUserConsentConnector.updateCdcConsent(false, consentId)
        ),
        tap({ error: (error) => this.showErrorMessage(error) })
      ),
    { dispatch: false }
  );

  showErrorMessage(error: any) {
    const errorMessage = error?.errorMessage;
    this.messageService.add(errorMessage, GlobalMessageType.MSG_TYPE_ERROR);
  }
  constructor(
    protected actions$: Actions,
    protected cdcUserConsentConnector: CdcUserConsentConnector,
    protected messageService: GlobalMessageService
  ) {}
}
