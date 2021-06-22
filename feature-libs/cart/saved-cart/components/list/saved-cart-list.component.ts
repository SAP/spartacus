import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {
  SavedCartFacade,
  SavedCartFormType,
} from '@spartacus/cart/saved-cart/root';
import { Cart, RoutingService } from '@spartacus/core';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'cx-saved-cart-list',
  templateUrl: './saved-cart-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SavedCartListComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();

  @ViewChild('element') element: ElementRef;

  isLoading$: Observable<boolean>;
  savedCarts$: Observable<Cart[]> = this.savedCartService.getList().pipe(
    map((lists) =>
      lists.sort((a: Cart, b: Cart) => {
        let date1: number = a.saveTime
          ? new Date(a.saveTime).getTime()
          : new Date().getTime();
        let date2: number = b.saveTime
          ? new Date(b.saveTime).getTime()
          : new Date().getTime();
        return date2 - date1;
      })
    )
  );
  constructor(
    protected routing: RoutingService,
    // TODO(BRIAN): add deprecations
    // protected translation: TranslationService,
    protected savedCartService: SavedCartFacade,
    // TODO(BRIAN): add deprecations
    protected vcr: ViewContainerRef,
    protected launchDialogService: LaunchDialogService
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.savedCartService.getSavedCartListProcessLoading();
    this.savedCartService.loadSavedCarts();

    // TODO(BRIAN): deprecation
    // this.subscription.add(
    //   this.savedCartService
    //     .getRestoreSavedCartProcessSuccess()
    //     .subscribe((success) => this.onRestoreComplete(success))
    // );
  }

  goToSavedCartDetails(cart: Cart): void {
    this.routing.go({
      cxRoute: 'savedCartsDetails',
      params: { savedCartId: cart?.code },
    });
  }

  // TODO(BRIAN): remove / breaking change - will remove before merge
  // restoreSavedCart(event: Event, cartId: string): void {
  //   this.savedCartService.restoreSavedCart(cartId);
  //   event.stopPropagation();
  // }

  openDialog(event: Event, cart: Cart): void {
    const dialog = this.launchDialogService.openDialog(
      LAUNCH_CALLER.SAVED_CART,
      this.element,
      this.vcr,
      { cart, layoutOption: SavedCartFormType.RESTORE }
    );

    if (dialog) {
      this.subscription.add(dialog.pipe(take(1)).subscribe());
    }
    event.stopPropagation();
  }

  // TODO(BRIAN): deprecation
  // onRestoreComplete(success: boolean): void {
  //   if (success) {
  //     this.savedCartService.clearRestoreSavedCart();
  //     this.savedCartService.clearSaveCart();
  //   }
  // }

  ngOnDestroy(): void {
    this.savedCartService.clearSavedCarts();
    this.savedCartService.clearSaveCart();
    this.savedCartService.clearRestoreSavedCart();
    this.subscription?.unsubscribe();
  }
}
