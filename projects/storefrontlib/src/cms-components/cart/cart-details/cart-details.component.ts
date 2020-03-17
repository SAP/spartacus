import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  AuthService,
  Cart,
  ActiveCartService,
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
    protected activeCartService: ActiveCartService,
    protected promotionService: PromotionService,
    protected selectiveCartService: SelectiveCartService,
    private authService: AuthService,
    private routingService: RoutingService,
    private featureConfig: FeatureConfigService
  ) {}

  ngOnInit() {
    this.cart$ = this.activeCartService.getActive();
    this.promotions$ = this.promotionService.getOrderPromotionsFromCart();

    this.entries$ = this.activeCartService
      .getEntries()
      .pipe(filter(entries => entries.length > 0));

    if (this.isSaveForLaterEnabled()) {
      this.cartLoaded$ = combineLatest([
        this.activeCartService.getLoaded(),
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
      this.cartLoaded$ = this.activeCartService.getLoaded();
    }
    //TODO  remove for #5958 end

    this.orderPromotions$ = this.promotionService.getOrderPromotions(
      this.promotionLocation
    );
  }

  //TODO remove feature flag for #5958
  isSaveForLaterEnabled(): boolean {
    if (this.featureConfig) {
      return this.featureConfig.isEnabled('saveForLater');
    }
    return false;
  }
  //TODO remove feature flag for #5958 end

  saveForLater(item: Item) {
    if (this.loggedIn) {
      this.activeCartService.removeEntry(item);
      this.selectiveCartService.addEntry(item.product.code, item.quantity);
    } else {
      this.routingService.go({ cxRoute: 'login' });
    }
  }
}
