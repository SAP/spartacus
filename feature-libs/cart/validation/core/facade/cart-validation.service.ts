import { Injectable } from '@angular/core';
import { CartValidationFacade } from '@spartacus/cart/validation/root';
import { combineLatest, Observable } from 'rxjs';
import {
  CommandService,
  UserIdService,
  ActiveCartService,
  Command,
  CommandStrategy,
} from '@spartacus/core';
import { CartValidationConnector } from '../connectors/cart-validation.connector';
import { CartModificationList } from '@spartacus/cart/validation/root';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class CartValidationService implements CartValidationFacade {
  protected getCartModificationListCommand: Command = this.command.create(
    () =>
      combineLatest([
        this.activeCartService.getActiveCartId(),
        this.userIdService.takeUserId(),
      ]).pipe(
        switchMap(([cartId, userId]) =>
          this.cartValidationConnector.get(cartId, userId)
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
    protected activeCartService: ActiveCartService
  ) {}

  /**
   * Returns cart modification list.
   *
   * @param cartId
   * @param userId
   */
  getCartValidationStatus(): Observable<CartModificationList> {
    return this.getCartModificationListCommand.execute(undefined);
  }
}
