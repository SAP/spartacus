import { Injectable } from '@angular/core';
import {
  GlobalMessageService,
  GlobalMessageType,
  ActiveCartService,
} from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class ClearCartService {
  constructor(
    protected globalMessageService: GlobalMessageService,
    protected activeCartService: ActiveCartService
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
