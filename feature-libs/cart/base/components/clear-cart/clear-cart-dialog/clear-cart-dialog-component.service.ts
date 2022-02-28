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
  DeleteCartEvent as ClearActiveCartEvent,
} from '@spartacus/cart/base/root';
import { mapTo, take, withLatestFrom } from 'rxjs/operators';
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
   * Clear all entires and info of active cart
   */
  clearActiveCart(): void {
    this.eventService
      .get(ClearActiveCartEvent)
      .pipe(take(1), mapTo(true))
      .subscribe((success) => {
        // Incur small delay to display message, event is intercepted before the DOM updates
        setTimeout(() => {
          this.displayGlobalMessage(success);
        }, 100);
      });

    this.activeCartFacade
      .getActiveCartId()
      .pipe(withLatestFrom(this.userIdService.getUserId()), take(1))
      .subscribe(([cartId, userId]) => {
        this.multiCartFacade.deleteCart(cartId, userId);
        this.closeDialog('Close dialog after cart cleared');
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
   * By default, the message is displayed with the type `Success` only,
   * a negative scenario has been handled in the occ layer already,
   * but the status flag allows to recognize it and add a custom error message as well.
   * @param status
   */
  protected displayGlobalMessage(status: boolean): void {
    if (status) {
      this.globalMessageService.add(
        { key: 'clearCart.cartClearedSuccessfully' },
        GlobalMessageType.MSG_TYPE_CONFIRMATION
      );
    }
  }
}
