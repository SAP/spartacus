import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { CartValidationConnector } from '../connectors/validation/cart-validation.connector';
import { CartModificationList } from '../../model/cart.model';
import { switchMap } from 'rxjs/operators';
import { Command, CommandService, CommandStrategy } from '../../util';
import { UserIdService } from '../../auth';
import { ActiveCartService } from './active-cart.service';

@Injectable({
  providedIn: 'root',
})
export class CartValidationService {
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
