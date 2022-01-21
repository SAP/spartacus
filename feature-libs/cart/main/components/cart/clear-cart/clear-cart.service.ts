import { Injectable } from '@angular/core';
import { GlobalMessageService, GlobalMessageType } from '@spartacus/core';
import { ActiveCartFacade } from '@spartacus/cart/main/root';
import { take } from 'rxjs/operators';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { LaunchDialogService } from '@spartacus/storefront';

@Injectable({
  providedIn: 'root',
})
export class ClearCartService {
  isClearing$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    protected launchDialogService: LaunchDialogService,
    protected globalMessageService: GlobalMessageService,
    protected activeCartFacade: ActiveCartFacade
  ) {}

  clearActiveCart(): void {
    this.isClearing$.next(true);
    combineLatest([
      this.activeCartFacade.clearActiveCart(),
      this.activeCartFacade.getEntries(),
    ])
      .pipe(take(1))
      .subscribe(([_, entries]) => {
        this.isClearing$.next(false);
        entries.length === 0 ? this.onComplete(true) : this.onComplete(false);
      });
  }

  getClearingCartProgess(): BehaviorSubject<boolean> {
    return this.isClearing$;
  }

  onComplete(success: boolean): void {
    this.closeDialog('Close dialog');
    if (success) {
      this.globalMessageService.add(
        { key: 'clearCart.cartClearedSuccessfully' },
        GlobalMessageType.MSG_TYPE_CONFIRMATION
      );
    } else {
      this.globalMessageService.add(
        { key: 'clearCart.cartClearedError' },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    }
  }

  closeDialog(reason: string): void {
    this.launchDialogService.closeDialog(reason);
  }
}
