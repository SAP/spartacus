import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import {
  ActiveCartService,
  AuthService,
  Cart,
  OrderEntry,
  PromotionLocation,
  PromotionResult,
  RoutingService,
  SelectiveCartService,
} from '@spartacus/core';
import { combineLatest, Observable, of } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { AbstractPromotionService } from '../../../shared/services/promotion/abstract-promotion.service';
import { CartPromotionService } from '../cart-promotion.service';

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
  selectiveCartEnabled: boolean;

  constructor(
    protected activeCartService: ActiveCartService,
    @Inject(CartPromotionService)
    protected promotionService: AbstractPromotionService,
    protected selectiveCartService: SelectiveCartService,
    protected authService: AuthService,
    protected routingService: RoutingService
  ) {}

  ngOnInit() {
    this.cart$ = this.activeCartService.getActive();
    this.promotions$ = this.promotionService.getOrderPromotions();

    this.entries$ = this.activeCartService
      .getEntries()
      .pipe(filter((entries) => entries.length > 0));

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

    this.orderPromotions$ = this.promotionService.getOrderPromotions();
  }

  saveForLater(item: OrderEntry) {
    if (this.loggedIn) {
      this.activeCartService.removeEntry(item);
      this.selectiveCartService.addEntry(item.product.code, item.quantity);
    } else {
      this.routingService.go({ cxRoute: 'login' });
    }
  }

  getAllCartEntryPromotions(
    cart: Cart
  ): { [key: number]: Observable<PromotionResult[]> } {
    return this.promotionService.getProductPromotionForAllEntries(cart);
  }
}
