/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import {
  CheckoutBillingAddressFacade,
  CheckoutQueryFacade,
} from '@spartacus/checkout/base/root';
import {
  Address,
  CommandService,
  CommandStrategy,
  OCC_USER_ID_ANONYMOUS,
  UserIdService,
} from '@spartacus/core';
import { Observable, combineLatest } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { CheckoutBillingAddressConnector } from '../connectors/checkout-billing-address/checkout-billing-address.connector';

interface AddressAndCart {
  address: Address;
  multiCartId?: string;
}
@Injectable()
export class CheckoutBillingAddressService
  implements CheckoutBillingAddressFacade
{
  protected setBillingAddressCommand =
    this.commandService.create<AddressAndCart>(
      (addressAndCart) =>
        this.checkoutPreconditions(addressAndCart.multiCartId).pipe(
          switchMap(([userId, cartId]) => {
            if (
              !addressAndCart.address ||
              !Object.keys(addressAndCart.address)?.length
            ) {
              throw new Error('Checkout conditions not met');
            }
            return this.checkoutBillingAddressConnector.setBillingAddress(
              userId,
              cartId,
              addressAndCart.address
            );
          })
        ),
      {
        strategy: CommandStrategy.CancelPrevious,
      }
    );

  constructor(
    protected activeCartFacade: ActiveCartFacade,
    protected userIdService: UserIdService,
    protected commandService: CommandService,
    protected checkoutBillingAddressConnector: CheckoutBillingAddressConnector,
    protected checkoutQueryFacade: CheckoutQueryFacade
  ) {}

  /**
   * Performs the necessary checkout preconditions.
   */
  protected checkoutPreconditions(
    multiCartId?: string
  ): Observable<[string, string]> {
    return multiCartId
      ? combineLatest([this.userIdService.takeUserId()]).pipe(
          take(1),
          map(([userId]) => {
            if (userId === OCC_USER_ID_ANONYMOUS) {
              throw new Error('Checkout conditions not met');
            }
            return [userId, multiCartId];
          })
        )
      : combineLatest([
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

  setBillingAddress(
    address: Address,
    multiCartId?: string
  ): Observable<unknown> {
    return this.setBillingAddressCommand.execute({ address, multiCartId });
  }
}
