/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { ActiveCartFacade, DeliveryMode } from '@spartacus/cart/base/root';
import {
  CheckoutDeliveryModeClearedErrorEvent,
  CheckoutDeliveryModeClearedEvent,
  CheckoutDeliveryModeSetEvent,
  CheckoutDeliveryModesFacade,
  CheckoutQueryFacade,
  CheckoutSupportedDeliveryModesQueryReloadEvent,
  CheckoutSupportedDeliveryModesQueryResetEvent,
} from '@spartacus/checkout/base/root';
import {
  Command,
  CommandService,
  CommandStrategy,
  EventService,
  OCC_USER_ID_ANONYMOUS,
  Query,
  QueryNotifier,
  QueryService,
  QueryState,
  UserIdService,
} from '@spartacus/core';
import { combineLatest, Observable, throwError } from 'rxjs';
import { catchError, filter, map, switchMap, take, tap } from 'rxjs/operators';
import { CheckoutDeliveryModesConnector } from '../connectors/checkout-delivery-modes/checkout-delivery-modes.connector';

@Injectable()
export class CheckoutDeliveryModesService
  implements CheckoutDeliveryModesFacade
{
  /**
   * Returns the reload events for the supportedDeliveryModes query
   */
  protected getCheckoutSupportedDeliveryModesQueryReloadEvents(): QueryNotifier[] {
    return [CheckoutSupportedDeliveryModesQueryReloadEvent];
  }
  /**
   * Return the reset events for the supportedDeliveryModes query
   */
  protected getCheckoutSupportedDeliveryModesQueryResetEvents(): QueryNotifier[] {
    return [CheckoutSupportedDeliveryModesQueryResetEvent];
  }

  protected supportedDeliveryModesQuery: Query<DeliveryMode[]> =
    this.queryService.create<DeliveryMode[]>(
      () =>
        this.checkoutPreconditions().pipe(
          switchMap(([userId, cartId]) =>
            this.checkoutDeliveryModesConnector.getSupportedModes(
              userId,
              cartId
            )
          )
        ),
      {
        reloadOn: this.getCheckoutSupportedDeliveryModesQueryReloadEvents(),
        resetOn: this.getCheckoutSupportedDeliveryModesQueryResetEvents(),
      }
    );

  protected setDeliveryModeCommand: Command<string, unknown> =
    this.commandService.create<string>(
      (deliveryModeCode) =>
        this.checkoutPreconditions().pipe(
          switchMap(([userId, cartId]) =>
            this.checkoutDeliveryModesConnector
              .setMode(userId, cartId, deliveryModeCode)
              .pipe(
                tap(() => {
                  this.eventService.dispatch(
                    { userId, cartId, cartCode: cartId, deliveryModeCode },
                    CheckoutDeliveryModeSetEvent
                  );
                })
              )
          )
        ),
      {
        strategy: CommandStrategy.CancelPrevious,
      }
    );

  protected clearDeliveryModeCommand: Command<void, unknown> =
    this.commandService.create<void>(
      () =>
        this.checkoutPreconditions().pipe(
          switchMap(([userId, cartId]) =>
            this.checkoutDeliveryModesConnector
              .clearCheckoutDeliveryMode(userId, cartId)
              .pipe(
                tap(() => {
                  this.eventService.dispatch(
                    {
                      userId,
                      cartId,
                      /**
                       * As we know the cart is not anonymous (precondition checked),
                       * we can safely use the cartId, which is actually the cart.code.
                       */
                      cartCode: cartId,
                    },
                    CheckoutDeliveryModeClearedEvent
                  );
                }),
                catchError((error) => {
                  this.eventService.dispatch(
                    {
                      userId,
                      cartId,
                      /**
                       * As we know the cart is not anonymous (precondition checked),
                       * we can safely use the cartId, which is actually the cart.code.
                       */
                      cartCode: cartId,
                    },
                    CheckoutDeliveryModeClearedErrorEvent
                  );

                  return throwError(error);
                })
              )
          )
        ),
      {
        strategy: CommandStrategy.CancelPrevious,
      }
    );

  constructor(
    protected activeCartFacade: ActiveCartFacade,
    protected userIdService: UserIdService,
    protected eventService: EventService,
    protected queryService: QueryService,
    protected commandService: CommandService,
    protected checkoutDeliveryModesConnector: CheckoutDeliveryModesConnector,
    protected checkoutQueryFacade: CheckoutQueryFacade
  ) {}

  /**
   * Performs the necessary checkout preconditions.
   */
  protected checkoutPreconditions(): Observable<[string, string]> {
    return combineLatest([
      this.userIdService.takeUserId(),
      this.activeCartFacade.takeActiveCartId(),
      this.activeCartFacade.isGuestCart(),
    ]).pipe(
      take(1),
      map(([userId, cartId, isGuestCart]) => {
        if (
          !userId ||
          !cartId ||
          (userId === OCC_USER_ID_ANONYMOUS && !isGuestCart)
        ) {
          throw new Error('Checkout conditions not met');
        }
        return [userId, cartId];
      })
    );
  }

  getSupportedDeliveryModesState(): Observable<QueryState<DeliveryMode[]>> {
    return this.supportedDeliveryModesQuery.getState();
  }

  getSupportedDeliveryModes(): Observable<DeliveryMode[]> {
    return this.getSupportedDeliveryModesState().pipe(
      filter((state) => !state.loading),
      map((state) => state.data ?? [])
    );
  }

  getSelectedDeliveryModeState(): Observable<
    QueryState<DeliveryMode | undefined>
  > {
    return this.checkoutQueryFacade
      .getCheckoutDetailsState()
      .pipe(map((state) => ({ ...state, data: state.data?.deliveryMode })));
  }

  setDeliveryMode(mode: string): Observable<unknown> {
    return this.setDeliveryModeCommand.execute(mode);
  }

  clearCheckoutDeliveryMode(): Observable<unknown> {
    return this.clearDeliveryModeCommand.execute();
  }
}
