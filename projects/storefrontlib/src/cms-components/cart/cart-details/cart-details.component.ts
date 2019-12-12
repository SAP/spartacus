import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  Cart,
  CartService,
  OrderEntry,
  SelectiveCartService,
  AuthService,
  RoutingService,
  FeatureConfigService,
} from '@spartacus/core';
import { Observable, combineLatest } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { Item } from '../cart-shared/cart-item/cart-item.component';

@Component({
  selector: 'cx-cart-details',
  templateUrl: './cart-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartDetailsComponent implements OnInit {
  cart$: Observable<Cart>;
  entries$: Observable<OrderEntry[]>;
  cartLoaded$: Observable<boolean>;
  loggedIn = false;

  constructor(
    protected cartService: CartService,
    protected selectiveCartService: SelectiveCartService,
    private authService: AuthService,
    private routingService: RoutingService,
    private featureConfig: FeatureConfigService
  ) {}

  ngOnInit() {
    this.cart$ = this.cartService.getActive();

    this.entries$ = this.cartService
      .getEntries()
      .pipe(filter(entries => entries.length > 0));

    if (this.isSaveForLaterEnabled()) {
      this.cartLoaded$ = combineLatest([
        this.cartService.getLoaded(),
        this.selectiveCartService.getLoaded(),
        this.authService.isUserLoggedIn(),
      ]).pipe(
        tap(([, , loggedIn]) => (this.loggedIn = loggedIn)),
        map(([cartLoaded, sflLoaded, loggedIn]) =>
          loggedIn ? cartLoaded && sflLoaded : cartLoaded
        )
      );
    } else {
      this.cartLoaded$ = this.cartService.getLoaded();
    }
  }

  isSaveForLaterEnabled(): boolean {
    return this.featureConfig.isEnabled('saveForLater');
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

  saveForLater(item: Item) {
    if (this.loggedIn) {
      this.cartService.removeEntry(item);
      this.selectiveCartService.addEntry(item.product.code, item.quantity);
    } else {
      this.routingService.go({ cxRoute: 'login' });
    }
  }
}
