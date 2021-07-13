import { Injectable } from '@angular/core';
import { CartValidationFacade } from '@spartacus/cart/validation/root';
import { combineLatest, Observable } from 'rxjs';
import {
  QueryService,
  Command,
  CommandService,
  UserIdService,
  ActiveCartService,
} from '@spartacus/core';
import { CartValidationConnector } from '../connectors/cart-validation.connector';
import { switchMap } from 'rxjs/operators';
import { CartModificationList } from '../model';

@Injectable()
export class CartValidationService implements CartValidationFacade {
  protected getCartModificationListCommand: Command<
    undefined,
    Observable<CartModificationList>
  > = this.command.create(() =>
    combineLatest([
      this.activeCartService.getActiveCartId(),
      this.userIdService.takeUserId(),
    ]).pipe(
      switchMap(([cartId, userId]) =>
        this.cartValidationConnector.get(cartId, userId)
      )
    )
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
  getCartModificationList(): Observable<unknown> {
    return this.getCartModificationListCommand.execute(undefined);
  }
}
