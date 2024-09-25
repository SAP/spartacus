/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import {
  ActiveCartFacade,
  CartAccessCodeFacade,
} from '@spartacus/cart/base/root';
import {
  backOff,
  Command,
  CommandService,
  DEFAULT_AUTHORIZATION_ERROR_RETRIES_COUNT,
  isAuthorizationError,
  LoggerService,
  tryNormalizeHttpError,
  UserIdService,
} from '@spartacus/core';
import {
  ApplePaySessionVerificationRequest,
  ApplePaySessionVerificationResponse,
  OpfQuickBuyFacade,
} from '@spartacus/opf/quick-buy/root';
import {
  catchError,
  combineLatest,
  concatMap,
  filter,
  switchMap,
  take,
} from 'rxjs';
import { OpfQuickBuyConnector } from '../connectors';

@Injectable()
export class OpfQuickBuyService implements OpfQuickBuyFacade {
  protected applePaySessionCommand: Command<
    {
      applePayWebSessionRequest: ApplePaySessionVerificationRequest;
    },
    ApplePaySessionVerificationResponse
  > = this.commandService.create((payload) => {
    return combineLatest([
      this.userIdService.getUserId(),
      this.activeCartFacade.getActiveCartId(),
    ]).pipe(
      filter(
        ([userId, activeCartId]: [string, string]) => !!activeCartId && !!userId
      ),
      switchMap(([userId, activeCartId]: [string, string]) => {
        return this.cartAccessCodeFacade.getCartAccessCode(
          userId,
          activeCartId
        );
      }),
      filter((response) => Boolean(response?.accessCode)),
      take(1),
      concatMap(({ accessCode: accessCode }) => {
        return this.opfQuickBuyConnector.getApplePayWebSession(
          payload.applePayWebSessionRequest,
          accessCode
        );
      }),
      catchError((error) => {
        throw tryNormalizeHttpError(error, this.logger);
      }),
      backOff({
        shouldRetry: isAuthorizationError,
        maxTries: DEFAULT_AUTHORIZATION_ERROR_RETRIES_COUNT,
      })
    );
  });

  constructor(
    protected commandService: CommandService,
    protected opfQuickBuyConnector: OpfQuickBuyConnector,
    protected cartAccessCodeFacade: CartAccessCodeFacade,
    protected activeCartFacade: ActiveCartFacade,
    protected userIdService: UserIdService,
    protected logger: LoggerService
  ) {}

  getApplePayWebSession(
    applePayWebSessionRequest: ApplePaySessionVerificationRequest
  ) {
    return this.applePaySessionCommand.execute({ applePayWebSessionRequest });
  }
}
