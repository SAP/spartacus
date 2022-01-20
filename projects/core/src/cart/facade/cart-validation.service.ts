import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';
import { UserIdService } from '../../auth/user-auth/facade/user-id.service';
import { CartModificationList } from '../../model/cart.model';
import {
  Command,
  CommandService,
  CommandStrategy,
} from '../../util/command-query/command.service';
import { CartValidationConnector } from '../connectors/validation/cart-validation.connector';
import { ActiveCartService } from './active-cart.service';

@Injectable({
  providedIn: 'root',
})
export class CartValidationService {
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
    protected activeCartService: ActiveCartService
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
