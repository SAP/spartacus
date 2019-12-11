import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import {
  Cart,
  CartService,
  OrderEntry,
  SelectiveCartService,
  AuthService,
  RoutingService,
  FeatureConfigService,
} from '@spartacus/core';
import { Observable, combineLatest, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Item } from '../cart-shared/cart-item/cart-item.component';

@Component({
  selector: 'cx-cart-details',
  templateUrl: './cart-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartDetailsComponent implements OnInit, OnDestroy {
  cart$: Observable<Cart>;
  entries$: Observable<OrderEntry[]>;
  cartLoaded$: Observable<boolean>;
  loggedIn$: Observable<boolean>;

  private subscription: Subscription;

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
    // this.cartLoaded$ = this.cartService.getLoaded();
    this.cartLoaded$ = combineLatest([
      this.cartService.getLoaded(),
      this.selectiveCartService.getLoaded(),
    ]).pipe(map(([cartLoaded, slfLoaded]) => cartLoaded && slfLoaded));

    this.loggedIn$ = this.authService.isUserLoggedIn();
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
    this.subscription = this.authService.getUserToken().subscribe(token => {
      if (token.access_token) {
        this.cartService.removeEntry(item);
        this.selectiveCartService.addEntry(item.product.code, item.quantity);
      } else {
        this.routingService.go({ cxRoute: 'login' });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
