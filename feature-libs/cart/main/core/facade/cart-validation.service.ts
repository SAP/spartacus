import { Injectable } from '@angular/core';
import {
  ActiveCartFacade,
  CartModificationList,
  CartValidationFacade,
} from '@spartacus/cart/main/root';
import {
  Command,
  CommandService,
  CommandStrategy,
  UserIdService,
} from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';
import { CartValidationConnector } from '../connectors/validation/cart-validation.connector';

@Injectable()
export class CartValidationService implements CartValidationFacade {
  protected validateCartCommand: Command<void, CartModificationList> =
    this.command.create(
      () =>
        combineLatest([
          this.activeCartService.getActiveCartId(),
          this.userIdService.takeUserId(),
          this.activeCartService.isStable(),
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

  constructor(
    protected cartValidationConnector: CartValidationConnector,
    protected command: CommandService,
    protected userIdService: UserIdService,
    protected activeCartService: ActiveCartFacade
  ) {}

  /**
   * Returns cart modification list.
   *
   * @param cartId
   * @param userId
   */
  validateCart(): Observable<CartModificationList> {
    return this.validateCartCommand.execute();
  }
}
