import { Injectable } from '@angular/core';
import { GlobalMessageService, GlobalMessageType } from '@spartacus/core';
import { ActiveCartFacade } from '@spartacus/cart/main/root';
import { filter, switchMap, take, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
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
    this.clearCart()
      .pipe(take(1))
      .subscribe(() => {
        this.isClearing$.next(false);
      });
  }

  clearCart(): Observable<boolean> {
    return this.activeCartFacade.getEntries().pipe(
      take(1),
      tap((entries) => {
        // Make copy and reverse entries[] to start at end of array
        // since cart entries are shifted downwards with removeEntry()
        entries
          .slice()
          .reverse()
          .forEach((entry) => this.activeCartFacade.removeEntry(entry));
      }),
      switchMap(() => this.activeCartFacade.isStable()),
      filter((data) => Boolean(data))
    );
  }

  getClearingCartProgess(): BehaviorSubject<boolean> {
    return this.isClearing$;
  }

  /**
   * Determine if these global messages are really needed
   *
   * @param success
   */
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
