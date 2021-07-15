import { Injectable } from '@angular/core';
import { CartValidationFacade } from '@spartacus/cart/validation/root';
import { combineLatest, Observable } from 'rxjs';
import {
  QueryService,
  Command,
  CommandService,
  UserIdService,
  ActiveCartService,
  CommandStrategy,
} from '@spartacus/core';
import { CartValidationConnector } from '../connectors/cart-validation.connector';
import { switchMap } from 'rxjs/operators';
import { CartModificationList } from '@spartacus/cart/validation/root';

@Injectable()
export class CartValidationService implements CartValidationFacade {
  protected getCartModificationListCommand: Command<
    undefined,
    CartModificationList
  > = this.command.create(
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
    protected query: QueryService,
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
  getCartModificationList(): Observable<CartModificationList> {
    return this.getCartModificationListCommand.execute(undefined);
  }
}
