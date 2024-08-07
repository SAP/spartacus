/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import {
  CheckoutDeliveryAddressClearedEvent,
  CheckoutDeliveryAddressCreatedEvent,
  CheckoutDeliveryAddressFacade,
  CheckoutDeliveryAddressSetEvent,
  CheckoutQueryFacade,
} from '@spartacus/checkout/base/root';
import {
  Address,
  Command,
  CommandService,
  CommandStrategy,
  EventService,
  OCC_USER_ID_ANONYMOUS,
  QueryState,
  UserIdService,
} from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { CheckoutDeliveryAddressConnector } from '../connectors/checkout-delivery-address/checkout-delivery-address.connector';

@Injectable()
export class CheckoutDeliveryAddressService
  implements CheckoutDeliveryAddressFacade
{
  protected createDeliveryAddressCommand: Command<
    { address: Address; cartId?: string },
    unknown
  > = this.commandService.create<{ address: Address; cartId: string }>(
    (payload) =>
      this.checkoutPreconditions(payload.cartId).pipe(
        switchMap(([userId, cartId]) => {
          const targetCartId = payload.cartId || cartId;
          return this.checkoutDeliveryAddressConnector
            .createAddress(userId, targetCartId, payload.address)
            .pipe(
              map((address) => {
                address.titleCode = address.titleCode;
                if (payload.address.region?.isocodeShort) {
                  address.region = {
                    ...address.region,
                    isocodeShort: payload.address.region.isocodeShort,
                  };
                }
                return address;
              }),
              tap((address) =>
                this.eventService.dispatch(
                  { userId, cartCode: targetCartId, address },
                  CheckoutDeliveryAddressCreatedEvent
                )
              )
            );
        })
      ),
    {
      strategy: CommandStrategy.CancelPrevious,
    }
  );

  protected setDeliveryAddressCommand: Command<Address, unknown> =
    this.commandService.create<Address>(
      (address) =>
        this.checkoutPreconditions().pipe(
          switchMap(([userId, cartId]) => {
            const addressId = address.id;
            if (!addressId) {
              throw new Error('Checkout conditions not met');
            }
            return this.checkoutDeliveryAddressConnector
              .setAddress(userId, cartId, addressId)
              .pipe(
                tap(() => {
                  this.eventService.dispatch(
                    {
                      userId,
                      cartId,
                      address,
                    },
                    CheckoutDeliveryAddressSetEvent
                  );
                })
              );
          })
        ),
      {
        strategy: CommandStrategy.CancelPrevious,
      }
    );

  protected clearDeliveryAddressCommand: Command<void, unknown> =
    this.commandService.create<void>(
      () =>
        this.checkoutPreconditions().pipe(
          switchMap(([userId, cartId]) =>
            this.checkoutDeliveryAddressConnector
              .clearCheckoutDeliveryAddress(userId, cartId)
              .pipe(
                tap(() => {
                  this.eventService.dispatch(
                    {
                      userId,
                      cartId,
                    },
                    CheckoutDeliveryAddressClearedEvent
                  );
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
    protected commandService: CommandService,
    protected checkoutDeliveryAddressConnector: CheckoutDeliveryAddressConnector,
    protected checkoutQueryFacade: CheckoutQueryFacade
  ) {}

  /**
   * Performs the necessary checkout preconditions.
   */
  protected checkoutPreconditions(
    customCartId?: string
  ): Observable<[string, string]> {
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
        return [userId, customCartId || cartId];
      })
    );
  }

  getDeliveryAddressState(): Observable<QueryState<Address | undefined>> {
    return this.checkoutQueryFacade.getCheckoutDetailsState().pipe(
      map((state) => ({
        ...state,
        data: state.data?.deliveryAddress,
      }))
    );
  }

  createAndSetAddress(address: Address, cartId?: string): Observable<unknown> {
    return this.createDeliveryAddressCommand.execute({ address, cartId });
  }

  setDeliveryAddress(address: Address): Observable<unknown> {
    return this.setDeliveryAddressCommand.execute(address);
  }

  clearCheckoutDeliveryAddress(): Observable<unknown> {
    return this.clearDeliveryAddressCommand.execute();
  }
}
