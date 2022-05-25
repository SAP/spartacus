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
  DeleteCartFailEvent,
} from '@spartacus/cart/base/root';
import { mapTo, switchMap, take, tap, withLatestFrom } from 'rxjs/operators';
import { merge, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClearCartDialogComponentService {
  constructor(
    protected globalMessageService: GlobalMessageService,
    protected activeCartFacade: ActiveCartFacade,
    protected multiCartFacade: MultiCartFacade,
    protected userIdService: UserIdService,
    protected eventService: EventService
  ) {}

  /**
   * Clear the cart by deleting the active cart.
   */
  deleteActiveCart(): Observable<boolean> {
    return this.activeCartFacade.getActiveCartId().pipe(
      withLatestFrom(this.userIdService.getUserId()),
      take(1),
      tap(([cartId, userId]) => {
        this.multiCartFacade.deleteCart(cartId, userId);
      }),
      switchMap(() =>
        merge(
          this.eventService.get(DeleteCartSuccessEvent).pipe(mapTo(true)),
          this.eventService.get(DeleteCartFailEvent).pipe(mapTo(false))
        ).pipe(take(1))
      ),
      tap((success: boolean) => this.displayGlobalMessage(success))
    );
  }
  /**
   * Display global message after clearing cart.
   * By default, only message displayed is of type `Success`. A negative scenario
   * related to cart has been handled in the occ layer already.
   *
   * @param success result of clear cart action
   */
  protected displayGlobalMessage(success: boolean): void {
    if (success) {
      this.globalMessageService.add(
        { key: 'clearCart.cartClearedSuccessfully' },
        GlobalMessageType.MSG_TYPE_CONFIRMATION
      );
    }
  }
}
