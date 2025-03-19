/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { CartGuestUser, CartGuestUserFacade } from '@spartacus/cart/base/root';
import { Command, CommandService, QueryService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CartGuestUserConnector } from '../connectors';

@Injectable()
export class CartGuestUserService implements CartGuestUserFacade {
  protected queryService = inject(QueryService);
  protected commandService = inject(CommandService);
  protected cartGuestUserConnector = inject(CartGuestUserConnector);

  protected createCartGuestUserCommand: Command<
    {
      userId: string;
      cartId: string;
      guestUserDetails?: CartGuestUser;
    },
    CartGuestUser
  > = this.commandService.create(({ userId, cartId, guestUserDetails }) =>
    this.cartGuestUserConnector.createCartGuestUser(
      userId,
      cartId,
      guestUserDetails
    )
  );

  protected updateCartGuestUserCommand: Command<
    {
      userId: string;
      cartId: string;
      guestUserDetails: CartGuestUser;
    },
    CartGuestUser
  > = this.commandService.create(({ userId, cartId, guestUserDetails }) =>
    this.cartGuestUserConnector.updateCartGuestUser(
      userId,
      cartId,
      guestUserDetails
    )
  );

  createCartGuestUser(
    userId: string,
    cartId: string,
    guestUserDetails?: CartGuestUser
  ): Observable<CartGuestUser> {
    return this.createCartGuestUserCommand.execute({
      userId,
      cartId,
      guestUserDetails,
    });
  }

  updateCartGuestUser(
    userId: string,
    cartId: string,
    guestUserDetails: CartGuestUser
  ): Observable<CartGuestUser> {
    return this.updateCartGuestUserCommand.execute({
      userId,
      cartId,
      guestUserDetails,
    });
  }
}
