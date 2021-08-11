import { Injectable } from '@angular/core';
import { CartValidationFacade } from '@spartacus/cart/validation/root';
import { Observable } from 'rxjs';
import { Command, CommandService, CommandStrategy } from '@spartacus/core';
import { CartValidationConnector } from '../connectors/cart-validation.connector';
import { CartModificationList } from '@spartacus/cart/validation/root';

@Injectable()
export class CartValidationService implements CartValidationFacade {
  protected getCartModificationListCommand: Command<
    { cartId: string; userId: string },
    CartModificationList
  > = this.command.create(
    (payload) =>
      this.cartValidationConnector.get(payload.cartId, payload.userId),
    {
      strategy: CommandStrategy.CancelPrevious,
    }
  );

  constructor(
    protected cartValidationConnector: CartValidationConnector,
    protected command: CommandService
  ) {}

  /**
   * Returns cart modification list.
   *
   * @param cartId
   * @param userId
   */
  getCartModificationList(
    cartId: string,
    userId: string
  ): Observable<CartModificationList> {
    return this.getCartModificationListCommand.execute({ cartId, userId });
  }
}
