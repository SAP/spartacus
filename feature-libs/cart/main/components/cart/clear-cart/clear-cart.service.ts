import { Injectable } from '@angular/core';
import { GlobalMessageService, GlobalMessageType } from '@spartacus/core';
import { ActiveCartFacade } from '@spartacus/cart/main/root';
import { take } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClearCartService {
  isClearing$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    protected globalMessageService: GlobalMessageService,
    protected activeCartService: ActiveCartFacade
  ) {}

  clearActiveCart(): void {
    this.isClearing$.next(true);
    this.activeCartService
      .clearActiveCart()
      .pipe(take(1))
      .subscribe(() => {
        this.isClearing$.next(false);
        this.onComplete();
      });
  }

  getClearingCartProgess(): BehaviorSubject<boolean> {
    return this.isClearing$;
  }

  onComplete(): void {
    this.globalMessageService.add(
      { key: 'clearCart.cartClearedSuccessfully' },
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );
  }
}
