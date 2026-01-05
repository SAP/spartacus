/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { ActiveCartFacade, OrderEntry } from '@spartacus/cart/base/root';
import { CheckoutQueryFacade } from '@spartacus/checkout/base/root';
import {
  UserIdService,
  CommandService,
  EventService,
  OCC_USER_ID_ANONYMOUS,
  Command,
  CommandStrategy,
  QueryState,
} from '@spartacus/core';
import { Observable, combineLatest, take, map, switchMap, tap } from 'rxjs';
import {
  CheckoutServiceDetailsFacade,
  CheckoutServiceDetailsSetEvent,
  ServiceDateTime,
} from '@spartacus/s4-service/root';
import { CheckoutServiceDetailsConnector } from '../connector/checkout-service-details.connector';

@Injectable()
export class CheckoutServiceDetailsService
  implements CheckoutServiceDetailsFacade
{
  protected activeCartFacade = inject(ActiveCartFacade);
  protected userIdService = inject(UserIdService);
  protected commandService = inject(CommandService);
  protected serviceDetailsConnector = inject(CheckoutServiceDetailsConnector);
  protected eventService = inject(EventService);
  protected checkoutQueryFacade = inject(CheckoutQueryFacade);

  protected setServiceScheduleSlotCommand: Command<ServiceDateTime> =
    this.commandService.create<ServiceDateTime>(
      (scheduledAt) =>
        this.checkoutPreconditions().pipe(
          switchMap(([userId, cartId]) =>
            this.serviceDetailsConnector
              .setServiceScheduleSlot(userId, cartId, {
                scheduledAt,
              })
              .pipe(
                tap(() =>
                  this.eventService.dispatch(
                    {
                      userId,
                      cartId,
                      scheduledAt,
                    },
                    CheckoutServiceDetailsSetEvent
                  )
                )
              )
          )
        ),
      {
        strategy: CommandStrategy.CancelPrevious,
      }
    );

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

  setServiceScheduleSlot(scheduledAt: ServiceDateTime): Observable<unknown> {
    return this.setServiceScheduleSlotCommand.execute(scheduledAt);
  }

  getSelectedServiceDetailsState(): Observable<
    QueryState<ServiceDateTime | undefined>
  > {
    return this.checkoutQueryFacade
      .getCheckoutDetailsState()
      .pipe(map((state) => ({ ...state, data: state.data?.servicedAt })));
  }

  getServiceProducts(): Observable<string[]> {
    return this.activeCartFacade.getEntries().pipe(
      map((entries: OrderEntry[]) => {
        return entries
          .map((entry: OrderEntry) => {
            if (entry.product?.productTypes === 'SERVICE') {
              return entry.product?.code;
            } else {
              return '';
            }
          })
          .filter((name): name is string => name !== '');
      })
    );
  }
  hasNonServiceItems(): Observable<boolean> {
    //Note: Pick up option is not applicable for Service Products
    return combineLatest([
      this.activeCartFacade.getDeliveryEntries(),
      this.getServiceProducts(),
    ]).pipe(
      take(1),
      map(([allEntries, serviceEntries]) => {
        return allEntries.length - serviceEntries.length > 0;
      })
    );
  }

  hasServiceItems(): Observable<boolean> {
    return this.getServiceProducts().pipe(
      map((products) => products.length > 0)
    );
  }
}
