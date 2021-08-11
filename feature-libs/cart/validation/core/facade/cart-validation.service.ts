import {Injectable} from '@angular/core';
import {CartValidationFacade} from '@spartacus/cart/validation/root';
import {combineLatest, Observable} from 'rxjs';
import {
  CommandService,
  QueryService,
  Query,
  UserIdService,
  ActiveCartService,
  Command,
  CommandStrategy
} from '@spartacus/core';
import {CartValidationConnector} from '../connectors/cart-validation.connector';
import {CartModificationList} from '@spartacus/cart/validation/root';
import {switchMap, take} from "rxjs/operators";

@Injectable()
export class CartValidationService implements CartValidationFacade {

  protected getCartModificationListCommand: Command<{ cartId: string; userId: string }, CartModificationList> = this.command.create(
    (payload) => this.cartValidationConnector.get(payload.cartId, payload.userId),
    {
      strategy: CommandStrategy.CancelPrevious,
    }
  );

  protected validationStatusQuery: Query<CartModificationList> = this.query.create(
    () => combineLatest([
      this.activeCartService.getActiveCartId(),
      this.userIdService.takeUserId(),
    ]).pipe(
      take(1),
      switchMap(([cartId, userId]) =>
        this.getCartModificationListCommand.execute({cartId, userId})
      )
    )
  );

  constructor(
    protected cartValidationConnector: CartValidationConnector,
    protected command: CommandService,
    protected query: QueryService,
    protected userIdService: UserIdService,
    protected activeCartService: ActiveCartService,
  ) {
  }

  /**
   * Returns cart modification list.
   *
   * @param cartId
   * @param userId
   */
  getCartValidationStatus(): Observable<CartModificationList> {
    return this.validationStatusQuery.get();
  }
}
