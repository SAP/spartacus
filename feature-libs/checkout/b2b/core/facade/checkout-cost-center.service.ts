/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { ActiveCartFacade, Cart } from '@spartacus/cart/base/root';
import {
  CheckoutCostCenterFacade,
  CheckoutCostCenterSetEvent,
} from '@spartacus/checkout/b2b/root';
import { CheckoutQueryFacade } from '@spartacus/checkout/base/root';
import {
  Command,
  CommandService,
  CommandStrategy,
  CostCenter,
  EventService,
  OCC_USER_ID_ANONYMOUS,
  QueryState,
  UserIdService,
} from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { CheckoutCostCenterConnector } from '../connectors/checkout-cost-center/checkout-cost-center.connector';

@Injectable()
export class CheckoutCostCenterService implements CheckoutCostCenterFacade {
  protected activeCartFacade = inject(ActiveCartFacade);
  protected userIdService = inject(UserIdService);
  protected commandService = inject(CommandService);
  protected checkoutCostCenterConnector = inject(CheckoutCostCenterConnector);
  protected checkoutQueryFacade = inject(CheckoutQueryFacade);
  protected eventService = inject(EventService);

  protected setCostCenterCommand: Command<string, Cart> =
    this.commandService.create<string, Cart>(
      (payload) =>
        this.checkoutPreconditions().pipe(
          switchMap(([userId, cartId]) =>
            this.checkoutCostCenterConnector
              .setCostCenter(userId, cartId, payload)
              .pipe(
                tap(() =>
                  this.eventService.dispatch(
                    {
                      cartId,
                      userId,
                      code: payload,
                    },
                    CheckoutCostCenterSetEvent
                  )
                )
              )
          )
        ),
      {
        strategy: CommandStrategy.CancelPrevious,
      }
    );

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

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

  getCostCenterState(): Observable<QueryState<CostCenter | undefined>> {
    return this.checkoutQueryFacade.getCheckoutDetailsState().pipe(
      map((state) => ({
        ...state,
        data: state.data?.costCenter,
      }))
    );
  }

  setCostCenter(costCenterId: string): Observable<Cart> {
    return this.setCostCenterCommand.execute(costCenterId);
  }
}
