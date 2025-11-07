/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import {
  ActiveCartFacade,
  CartModification,
  CartModificationList,
  CartValidationFacade,
} from '@spartacus/cart/base/root';
import {
  Command,
  CommandService,
  CommandStrategy,
  UserIdService,
} from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';
import { CartValidationConnector } from '../connectors/validation/cart-validation.connector';
import { CartValidationStateService } from '../services/cart-validation-state.service';

@Injectable()
export class CartValidationService implements CartValidationFacade {
  protected cartValidationConnector = inject(CartValidationConnector);
  protected command = inject(CommandService);
  protected userIdService = inject(UserIdService);
  protected activeCartFacade = inject(ActiveCartFacade);
  protected cartValidationStateService = inject(CartValidationStateService);

  protected validateCartCommand: Command<void, CartModificationList> =
    this.command.create(
      () =>
        combineLatest([
          this.activeCartFacade.getActiveCartId(),
          this.userIdService.takeUserId(),
          this.activeCartFacade.isStable(),
        ]).pipe(
          filter(([_, __, loaded]) => loaded),
          take(1),
          switchMap(([cartId, userId]) =>
            this.cartValidationConnector.validate(cartId, userId)
          )
        ),
      {
        strategy: CommandStrategy.CancelPrevious,
      }
    );

  /**
   * Validates cart and returns cart modification list.
   */
  validateCart(): Observable<CartModificationList> {
    return this.validateCartCommand.execute();
  }

  /**
   * Returns cart modification results
   */
  getValidationResults(): Observable<CartModification[]> {
    return this.cartValidationStateService.cartValidationResult$;
  }
}
