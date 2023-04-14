import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { cdcUserConsentService } from '@spartacus/cdc/components';
import { UserActions, normalizeHttpError } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { map, catchError, concatMap } from 'rxjs/operators';

@Injectable()
export class CdcUserConsentsEffects {
  constructor(
    protected actions$: Actions,
    protected cdcUserConsentService: cdcUserConsentService
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
}
