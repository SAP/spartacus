import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  AuthService,
  Cart,
  CartService,
  FeatureConfigService,
  OrderEntry,
  PromotionLocation,
  PromotionResult,
  RoutingService,
  SelectiveCartService,
} from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { PromotionService } from '../../../shared/services/promotion/promotion.service';
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
  orderPromotions$: Observable<PromotionResult[]>;
  promotionLocation: PromotionLocation = PromotionLocation.ActiveCart;
  promotions$: Observable<PromotionResult[]>;

  constructor(
    cartService: CartService,
    // tslint:disable-next-line:unified-signatures
    promotionService: PromotionService,
    selectiveCartService: SelectiveCartService,
    authService: AuthService,
    routingService: RoutingService,
    featureConfig: FeatureConfigService
  );

  /**
   * @deprecated Since 1.5
   * Use promotionService instead of the promotion inputs.
   * Remove issue: #5670
   */
  constructor(cartService: CartService);

  constructor(
    protected cartService: CartService,
    protected promotionService?: PromotionService,
    protected selectiveCartService?: SelectiveCartService,
    private authService?: AuthService,
    private routingService?: RoutingService,
    private featureConfig?: FeatureConfigService
  ) {}

  ngOnInit() {
    this.cart$ = this.cartService.getActive();

    /**
     * TODO Remove the check for promotion service
     * Issue: GH-5670
     */
    if (this.promotionService) {
      this.promotions$ = this.promotionService.getOrderPromotionsFromCart();
    }

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
    }
    //TODO remove for #5958
    else {
      this.cartLoaded$ = this.cartService.getLoaded();
    }
    //TODO  remove for #5958 end
    if (this.promotionService) {
      this.orderPromotions$ = this.promotionService.getOrderPromotions(
        this.promotionLocation
      );
    }
  }

  //TODO remove feature flag for #5958
  isSaveForLaterEnabled(): boolean {
    if (this.featureConfig) {
      return this.featureConfig.isEnabled('saveForLater');
    }
    return false;
  }
  //TODO remove feature flag for #5958 end

  /**
   * @deprecated Since 1.5
   * Use promotionService instead of the promotion inputs.
   * Remove issue: #5670
   */
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
