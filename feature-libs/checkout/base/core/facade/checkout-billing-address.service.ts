/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
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
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { CheckoutBillingAddressConnector } from '../connectors/checkout-billing-address/checkout-billing-address.connector';

@Injectable()
export class CheckoutBillingAddressService
  implements CheckoutBillingAddressFacade
{
  protected setBillingAddressCommand = this.commandService.create<Address>(
    (address) =>
      this.checkoutPreconditions().pipe(
        switchMap(([userId, cartId]) => {
          if (!address || !Object.keys(address)?.length) {
            throw new Error('Checkout conditions not met');
          }
          return this.checkoutBillingAddressConnector.setBillingAddress(
            userId,
            cartId,
            address
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

  setBillingAddress(address: Address): Observable<unknown> {
    return this.setBillingAddressCommand.execute(address);
  }
}
