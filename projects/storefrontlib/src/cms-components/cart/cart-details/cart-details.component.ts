import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  ActiveCartService,
  AuthService,
  Cart,
  EntryGroup,
  OrderEntry,
  PromotionLocation,
  PromotionResult,
  RoutingService,
  SelectiveCartService,
} from '@spartacus/core';
import { BundleService } from 'projects/core/src/cart/bundle/core/facade';
import { combineLatest, Observable, of } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { PromotionService } from '../../../shared/services/promotion/promotion.service';

@Component({
  selector: 'cx-cart-details',
  templateUrl: './cart-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartDetailsComponent implements OnInit {
  cart$: Observable<Cart>;
  entries$: Observable<OrderEntry[]>;
  entryGroups$: Observable<EntryGroup[]>;
  cartLoaded$: Observable<boolean>;
  loggedIn = false;
  orderPromotions$: Observable<PromotionResult[]>;
  promotionLocation: PromotionLocation = PromotionLocation.ActiveCart;
  promotions$: Observable<PromotionResult[]>;
  selectiveCartEnabled: boolean;

  constructor(
    protected activeCartService: ActiveCartService,
    protected promotionService: PromotionService,
    protected selectiveCartService: SelectiveCartService,
    protected authService: AuthService,
    protected routingService: RoutingService,
    protected bundleService: BundleService
  ) { }

  ngOnInit() {
    this.cart$ = this.activeCartService.getActive();
    this.promotions$ = this.promotionService.getOrderPromotionsFromCart();

    this.entries$ = this.activeCartService
      .getEntries()
      .pipe(filter((entries) => entries.length > 0));

    this.entryGroups$ = this.activeCartService
      .getEntryGroups()
      .pipe(filter((groups) => groups.length > 0));

    this.selectiveCartEnabled = this.selectiveCartService.isEnabled();

    // TODO(#10547): Switch in 4.0 `selectiveCartService.getLoaded` to `selectiveCartService.isStable` method
    this.cartLoaded$ = combineLatest([
      this.activeCartService.isStable(),
      this.selectiveCartEnabled
        ? this.selectiveCartService.getLoaded()
        : of(false),
      this.authService.isUserLoggedIn(),
    ]).pipe(
      tap(([, , loggedIn]) => (this.loggedIn = loggedIn)),
      map(([cartLoaded, sflLoaded, loggedIn]) =>
        loggedIn && this.selectiveCartEnabled
          ? cartLoaded && sflLoaded
          : cartLoaded
      )
    );

    this.orderPromotions$ = this.promotionService.getOrderPromotions(
      this.promotionLocation
    );
  }

  saveForLater(item: OrderEntry) {
    if (this.loggedIn) {
      this.activeCartService.removeEntry(item);
      this.selectiveCartService.addEntry(item.product.code, item.quantity);
    } else {
      this.routingService.go({ cxRoute: 'login' });
    }
  }

  getBundleAllowedProducts(entryGroupNumber: number) {
    this.activeCartService.getBundleAllowedProducts(entryGroupNumber);
  }

  removeBundle(entryGroupNumber: number) {
    this.activeCartService.deleteEntryGroup(entryGroupNumber);
  }

  addProductToBundle(entryGroupNumber: number, product: OrderEntry) {
    this.activeCartService.addToEntryGroup(entryGroupNumber, product);
  }

  getAvailableProducts(entryGroupNumber: number) {
    return this.activeCartService.getAvailableEntries(entryGroupNumber)
  }
}
