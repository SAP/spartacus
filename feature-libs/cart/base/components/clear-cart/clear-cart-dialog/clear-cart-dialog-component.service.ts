import { Injectable } from '@angular/core';
import {
  EventService,
  GlobalMessageService,
  GlobalMessageType,
  UserIdService,
} from '@spartacus/core';
import {
  ActiveCartFacade,
  MultiCartFacade,
  DeleteCartSuccessEvent,
} from '@spartacus/cart/base/root';
import { switchMap, take, tap, withLatestFrom } from 'rxjs/operators';
import { LaunchDialogService } from '@spartacus/storefront';

@Injectable({
  providedIn: 'root',
})
export class ClearCartDialogComponentService {
  constructor(
    protected launchDialogService: LaunchDialogService,
    protected globalMessageService: GlobalMessageService,
    protected activeCartFacade: ActiveCartFacade,
    protected multiCartFacade: MultiCartFacade,
    protected userIdService: UserIdService,
    protected eventService: EventService
  ) {}

  /**
   * Clear all entries and info of active cart
   */
  clearActiveCart(): void {
    this.activeCartFacade
      .getActiveCartId()
      .pipe(
        withLatestFrom(this.userIdService.getUserId()),
        take(1),
        tap(([cartId, userId]) => {
          this.multiCartFacade.deleteCart(cartId, userId);
        }),
        switchMap(() => this.eventService.get(DeleteCartSuccessEvent)),
        tap(() => this.closeDialog('Close dialog after cart cleared')),
        take(1)
      )
      .subscribe(() => {
        this.displayGlobalMessage();
      });
  }

  /**
   * Close clear cart modal dialog
   * @param reason
   */
  closeDialog(reason: string): void {
    this.launchDialogService.closeDialog(reason);
  }

  /**
   * Display global message after clearing cart.
   */
  protected displayGlobalMessage(): void {
    this.globalMessageService.add(
      { key: 'clearCart.cartClearedSuccessfully' },
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );
  }
}
