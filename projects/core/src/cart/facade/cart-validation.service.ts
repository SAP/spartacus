import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { CartValidationConnector } from '../connectors/validation/cart-validation.connector';
import { CartModificationList } from '../../model/cart.model';
import { switchMap, take } from 'rxjs/operators';
import { Command, CommandService, CommandStrategy } from '../../util/index';
import { UserIdService } from '../../auth/user-auth/facade/user-id.service';
import { ActiveCartService } from './active-cart.service';

@Injectable({
  providedIn: 'root',
})
export class CartValidationService {
  protected validateCartCommand: Command = this.command.create(
    () =>
      combineLatest([
        this.activeCartService.getActiveCartId(),
        this.userIdService.takeUserId(),
      ]).pipe(
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
    return this.validateCartCommand.execute(undefined);
  }
}
