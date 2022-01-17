import { Injectable } from '@angular/core';
import { GlobalMessageService, GlobalMessageType } from '@spartacus/core';
import { ActiveCartFacade } from '@spartacus/cart/main/root';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ClearCartService {
  constructor(
    protected globalMessageService: GlobalMessageService,
    protected activeCartService: ActiveCartFacade
  ) {}

  clearActiveCart(): void {
    this.activeCartService
      .clearActiveCart()
      .pipe(take(1))
      .subscribe(() => {
        this.onComplete();
      });
  }

  onComplete(): void {
    this.globalMessageService.add(
      { key: 'clearCart.cartClearedSuccessfully' },
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );
  }
}
