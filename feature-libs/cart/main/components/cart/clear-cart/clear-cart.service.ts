import { Injectable } from '@angular/core';
import { GlobalMessageService, GlobalMessageType } from '@spartacus/core';
import { ActiveCartFacade } from '@spartacus/cart/main/root';

@Injectable({
  providedIn: 'root',
})
export class ClearCartService {
  constructor(
    protected globalMessageService: GlobalMessageService,
    protected activeCartService: ActiveCartFacade
  ) {}

  clearActiveCart(): void {
    this.activeCartService.clearActiveCart();
  }

  onComplete(success: boolean): void {
    if (success) {
      this.globalMessageService.add(
        { key: 'clearCart.cartClearedSuccessfully' },
        GlobalMessageType.MSG_TYPE_CONFIRMATION
      );
    }
  }
}
