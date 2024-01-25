/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { LoggerService } from '../../../../logger';
import { normalizeHttpError } from '../../../../util/normalize-http-error';
import { ClientToken } from '../../../client-auth/models/client-token.model';
import { ClientAuthenticationTokenService } from '../../services/client-authentication-token.service';
import { ClientAuthActions } from '../actions/index';

@Injectable()
export class ClientTokenEffect {
  protected logger = inject(LoggerService);

  loadClientToken$: Observable<ClientAuthActions.ClientTokenAction> =
    createEffect(() =>
      this.actions$.pipe(
        ofType(ClientAuthActions.LOAD_CLIENT_TOKEN),
        exhaustMap(() => {
          return this.clientAuthenticationTokenService
            .loadClientAuthenticationToken()
            .pipe(
              map((token: ClientToken) => {
                return new ClientAuthActions.LoadClientTokenSuccess(token);
              }),
              catchError((error) =>
                of(
                  new ClientAuthActions.LoadClientTokenFail(
                    normalizeHttpError(error, this.logger)
                  )
                )
              )
            );
        })
      )
    );

  constructor(
    private actions$: Actions,
    private clientAuthenticationTokenService: ClientAuthenticationTokenService
  ) {}
}
