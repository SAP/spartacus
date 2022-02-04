import { Injectable } from '@angular/core';
import { GlobalMessageService, GlobalMessageType } from '@spartacus/core';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { filter, switchMap, take, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { LaunchDialogService } from '@spartacus/storefront';

@Injectable({
  providedIn: 'root',
})
export class ClearCartDialogComponentService {
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
        this.onComplete();
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

  getClearingCartProgess(): Observable<boolean> {
    return this.isClearing$.asObservable();
  }

  /**
   * Display succesful global message after clearing cart.
   *
   * @param success
   */
  addSuccessGlobalMessage(): void {
    this.globalMessageService.add(
      { key: 'clearCart.cartClearedSuccessfully' },
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );
  }

  onComplete(): void {
    this.closeDialog('Close dialog after cart cleared successfully');
    this.activeCartFacade
      .getEntries()
      .pipe(take(1))
      .subscribe((entries) => {
        if (entries.length === 0) {
          this.addSuccessGlobalMessage();
        }
      });
  }

  closeDialog(reason: string): void {
    this.launchDialogService.closeDialog(reason);
  }
}
