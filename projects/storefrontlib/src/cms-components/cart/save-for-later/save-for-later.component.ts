import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  SelectiveCartService,
  Cart,
  OrderEntry,
  ActiveCartService,
  AuthService,
  RoutingService,
  AuthRedirectService,
} from '@spartacus/core';
import { Observable, combineLatest, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Item } from '../cart-shared/cart-item/cart-item.component';

@Component({
  selector: 'cx-save-for-later',
  templateUrl: './save-for-later.component.html',
})
export class SaveForLaterComponent implements OnInit, OnDestroy {
  cart$: Observable<Cart>;
  entries$: Observable<OrderEntry[]>;
  cartLoaded$: Observable<boolean>;

  private subscription: Subscription;

  constructor(
    protected cartService: ActiveCartService,
    protected selectiveCartService: SelectiveCartService,
    private authService: AuthService,
    private routingService: RoutingService,
    private authRedirectService: AuthRedirectService
  ) {}

  ngOnInit() {
    this.cart$ = this.selectiveCartService.getCart();
    this.entries$ = this.selectiveCartService
      .getEntries()
      .pipe(filter(entries => entries.length > 0));
    this.cartLoaded$ = combineLatest([
      this.cartService.getLoaded(),
      this.selectiveCartService.getLoaded(),
    ]).pipe(map(([cartLoaded, slfLoaded]) => cartLoaded && slfLoaded));
  }

  getAllPromotionsForCart(cart: Cart): any[] {
    const potentialPromotions = [];
    potentialPromotions.push(...(cart.potentialOrderPromotions || []));
    potentialPromotions.push(...(cart.potentialProductPromotions || []));

    const appliedPromotions = [];
    appliedPromotions.push(...(cart.appliedOrderPromotions || []));
    appliedPromotions.push(...(cart.appliedProductPromotions || []));

    return [...potentialPromotions, ...appliedPromotions];
  }

  moveToCart(item: Item) {
    this.subscription = this.authService
      .isUserLoggedIn()
      .subscribe(loggedIn => {
        if (loggedIn) {
          this.selectiveCartService.removeEntry(item);
          this.cartService.addEntry(item.product.code, item.quantity);
        } else {
          this.routingService.go({ cxRoute: 'login' });
          this.authRedirectService.reportAuthGuard();
        }
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
