import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CartBundleService } from '@spartacus/cart/bundle/core';
import {
  ActiveCartService,
  AuthService,
  Cart,
  EntryGroup,
  OrderEntry,
  PromotionLocation,
  RoutingService,
  SelectiveCartService,
} from '@spartacus/core';
import { combineLatest, Observable, of } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

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
  promotionLocation: PromotionLocation = PromotionLocation.ActiveCart;
  selectiveCartEnabled: boolean;

  constructor(
    protected activeCartService: ActiveCartService,
    protected selectiveCartService: SelectiveCartService,
    protected authService: AuthService,
    protected routingService: RoutingService,
    protected cartBundleService: CartBundleService
  ) { }

  ngOnInit() {
    this.cart$ = this.activeCartService.getActive();

    this.entries$ = this.activeCartService
      .getEntries()
      .pipe(filter((entries) => entries.length > 0));

    this.entryGroups$ = this.activeCartService
      .getEntryGroups()
      .pipe(filter((groups) => groups.length > 0));

    this.selectiveCartEnabled = this.selectiveCartService.isEnabled();

    this.cartLoaded$ = combineLatest([
      this.activeCartService.isStable(),
      this.selectiveCartEnabled
        ? this.selectiveCartService.isStable()
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
    this.cartBundleService.getBundleAllowedProducts(entryGroupNumber);
  }

  removeBundle(entryGroupNumber: number) {
    this.activeCartService.deleteEntryGroup(entryGroupNumber);
  }

  addProductToBundle(entryGroupNumber: number, product: OrderEntry) {
    this.activeCartService.addToEntryGroup(entryGroupNumber, product);
  }

  getAvailableProducts(entryGroupNumber: number) {
    return this.cartBundleService.getAvailableEntries(entryGroupNumber)
  }
}
