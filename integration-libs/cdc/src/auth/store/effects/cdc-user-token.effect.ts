import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  AuthActions,
  ErrorModel,
  GlobalMessageService,
  GlobalMessageType,
  HttpErrorModel,
  OCC_USER_ID_CURRENT,
  UserToken,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { CdcUserAuthenticationTokenService } from '../../services/user-authentication/cdc-user-authentication-token.service';
import { CdcAuthActions } from '../actions';

const UNKNOWN_ERROR = {
  error: 'unknown error',
};

const circularReplacer = () => {
  const seen = new WeakSet();
  return (_key: any, value: any) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

@Injectable()
export class CdcUserTokenEffects {
  @Effect()
  loadCdcUserToken$: Observable<
    CdcAuthActions.CdcUserTokenAction | AuthActions.LoadUserTokenSuccess
  > = this.actions$.pipe(
    ofType(CdcAuthActions.LOAD_CDC_USER_TOKEN),
    map((action: CdcAuthActions.LoadCdcUserToken) => action.payload),
    mergeMap((payload) =>
      this.userTokenService
        .loadTokenUsingCustomFlow(
          payload.UID,
          payload.UIDSignature,
          payload.signatureTimestamp,
          payload.idToken,
          payload.baseSite
        )
        .pipe(
          map((token: UserToken) => {
            const date = new Date();
            date.setSeconds(date.getSeconds() + token.expires_in);
            token.expiration_time = date.toJSON();
            token.userId = OCC_USER_ID_CURRENT;
            return new AuthActions.LoadUserTokenSuccess(token);
          }),
          catchError((error) => {
            this.globalMessageService.add(
              { key: 'httpHandlers.badGateway' },
              GlobalMessageType.MSG_TYPE_ERROR
            );
            return of(
              new CdcAuthActions.LoadCdcUserTokenFail({
                error: this.makeErrorSerializable(error),
                initialActionPayload: payload,
              })
            );
          })
        )
    )
  );

  makeErrorSerializable(
    error: HttpErrorResponse | ErrorModel | any
  ): HttpErrorModel | Error | any {
    if (error instanceof Error) {
      return {
        message: error.message,
        type: error.name,
        reason: error.stack,
      } as ErrorModel;
    }

    if (error instanceof HttpErrorResponse) {
      let serializableError = error.error;
      if (this.isObject(error.error)) {
        serializableError = JSON.stringify(error.error, circularReplacer());
      }

      return {
        message: error.message,
        error: serializableError,
        status: error.status,
        statusText: error.statusText,
        url: error.url,
      } as HttpErrorModel;
    }

    return this.isObject(error) ? UNKNOWN_ERROR : error;
  }

  isObject(item: any): boolean {
    return item && typeof item === 'object' && !Array.isArray(item);
  }

  constructor(
    private actions$: Actions,
    private userTokenService: CdcUserAuthenticationTokenService,
    private globalMessageService: GlobalMessageService
  ) {}
}
