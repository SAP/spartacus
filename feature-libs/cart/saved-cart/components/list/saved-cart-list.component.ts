import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { SavedCartService } from '@spartacus/cart/saved-cart/core';
import {
  Cart,
  ClearCheckoutService,
  RoutingService,
  TranslationService,
} from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'cx-saved-cart-list',
  templateUrl: './saved-cart-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SavedCartListComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();

  savedCarts$: Observable<Cart[]> = this.savedCartService.getList();
  isLoading$: Observable<boolean>;

  constructor(
    protected routing: RoutingService,
    protected translation: TranslationService,
    protected savedCartService: SavedCartService,
    protected clearCheckoutService: ClearCheckoutService
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.savedCartService.getSavedCartListProcessLoading();
    this.savedCartService.loadSavedCarts();

    this.subscription.add(
      this.savedCartService
        .getRestoreSavedCartProcessSuccess()
        .subscribe((success) => this.onSuccess(success))
    );
  }

  goToSavedCartDetails(cart: Cart): void {
    this.routing.go({
      cxRoute: 'savedCartsDetails',
      params: { savedCartId: cart?.code },
    });
  }

  restoreSavedCart(event: Event, cartId: string): void {
    this.savedCartService.restoreSavedCart(cartId);
    event.stopPropagation();
  }

  onSuccess(success: boolean): void {
    if (success) {
      this.savedCartService.clearRestoreSavedCart();
      this.savedCartService.clearSaveCart();
      this.clearCheckoutService.resetCheckoutProcesses();
    }
  }

  ngOnDestroy(): void {
    this.savedCartService.clearSavedCarts();
    this.savedCartService.clearSaveCart();
    this.savedCartService.clearRestoreSavedCart();
    this.subscription?.unsubscribe();
  }
}
