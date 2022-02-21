import { Injectable } from '@angular/core';
import { GlobalMessageService, GlobalMessageType } from '@spartacus/core';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { LaunchDialogService } from '@spartacus/storefront';

@Injectable({
  providedIn: 'root',
})
export class ClearCartDialogComponentService {
  protected isClearing$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  constructor(
    protected launchDialogService: LaunchDialogService,
    protected globalMessageService: GlobalMessageService,
    protected activeCartFacade: ActiveCartFacade
  ) {}

  clearActiveCart(): void {
    this.activeCartFacade
      .getEntries()
      .pipe(
        take(1),
        tap((entries) => {
          this.isClearing$.next(true);
          // Make copy and reverse entries[] to start at end of array
          // since cart entries are shifted downwards with removeEntry()
          entries
            .slice()
            .reverse()
            .forEach((entry) => this.activeCartFacade.removeEntry(entry));
        }),
        switchMap(() => this.activeCartFacade.isStable()),
        filter((data) => Boolean(data)),
        tap(() => this.closeDialog('Close dialog after cart cleared')),
        switchMap(() =>
          this.activeCartFacade
            .getEntries()
            .pipe(map((entries) => entries.length === 0))
        ),
        take(1)
      )
      .subscribe((success) => {
        this.isClearing$.next(false);
        this.displayGlobalMessage(success);
      });
  }

  getClearingCartProgress(): Observable<boolean> {
    return this.isClearing$.asObservable();
  }

  closeDialog(reason: string): void {
    this.launchDialogService.closeDialog(reason);
  }

  /**
   * Display global message after clearing cart.
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
