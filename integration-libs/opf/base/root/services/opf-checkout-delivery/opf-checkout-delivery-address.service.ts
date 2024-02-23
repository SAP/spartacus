/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import {
  ActiveCartFacade,
  CartType,
  MultiCartFacade,
} from '@spartacus/cart/base/root';
import {
  CheckoutDeliveryAddressConnector,
  CheckoutDeliveryAddressService,
} from '@spartacus/checkout/base/core';
import {
  Address,
  Command,
  CommandService,
  CommandStrategy,
  EventService,
  OCC_USER_ID_ANONYMOUS,
  UserIdService,
} from '@spartacus/core';
import { Observable, combineLatest } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { OpfCheckoutQueryService } from './opf-checkout-query.service';

@Injectable()
export class OpfCheckoutDeliveryAddressService extends CheckoutDeliveryAddressService {
  protected multiCartFacade = inject(MultiCartFacade);

  protected multipleCartCart = false;

  constructor(
    protected activeCartFacade: ActiveCartFacade,
    protected userIdService: UserIdService,
    protected eventService: EventService,
    protected commandService: CommandService,
    protected checkoutDeliveryAddressConnector: CheckoutDeliveryAddressConnector,
    protected checkoutQueryFacade: OpfCheckoutQueryService
  ) {
    super(
      activeCartFacade,
      userIdService,
      eventService,
      commandService,
      checkoutDeliveryAddressConnector,
      checkoutQueryFacade
    );
  }

  setMultipleCart(multiple: boolean) {
    this.multipleCartCart = multiple;
  }
  protected checkoutPreconditions(): Observable<[string, string]> {
    console.log('flo checkoutPreconditions');
    const cartId$ = this.multipleCartCart
      ? this.multiCartFacade.getCartIdByType(CartType.NEW_CREATED)
      : this.activeCartFacade.takeActiveCartId();
    return combineLatest([
      this.userIdService.takeUserId(),
      cartId$,
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

  protected createDeliveryAddressCommand: Command<Address, unknown> =
    this.commandService.create<Address>(
      (payload) =>
        this.checkoutPreconditions().pipe(
          switchMap(([userId, cartId]) => {
            return this.checkoutDeliveryAddressConnector
              .createAddress(userId, cartId, payload)
              .pipe(
                map((address) => {
                  address.titleCode = payload.titleCode;
                  if (payload.region?.isocodeShort) {
                    address.region = {
                      ...address.region,
                      isocodeShort: payload.region.isocodeShort,
                    };
                  }
                  return address;
                })
                // tap((address) =>
                //   this.eventService.dispatch(
                //     { userId, cartId, address },
                //     CheckoutDeliveryAddressCreatedEvent
                //   )
                // )
              );
          })
        ),
      {
        strategy: CommandStrategy.CancelPrevious,
      }
    );
}
