import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  Cart,
  CartService,
  OrderEntry,
  PromotionResult,
  PromotionLocation,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { PromotionService } from '../../../shared/services/promotion/promotion.service';

@Component({
  selector: 'cx-cart-details',
  templateUrl: './cart-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartDetailsComponent implements OnInit {
  cart$: Observable<Cart>;
  entries$: Observable<OrderEntry[]>;
  cartLoaded$: Observable<boolean>;
  orderPromotions$: Observable<PromotionResult[]>;
  promotionLocation: PromotionLocation = PromotionLocation.ActiveCart;

  constructor(
    cartService: CartService,
    // tslint:disable-next-line:unified-signatures
    promotionService: PromotionService
  );

  /**
   * @deprecated Since 1.4
   * Use promotionService instead of the promotion inputs.
   * Remove issue: #5670
   */
  constructor(cartService: CartService);

  constructor(
    protected cartService: CartService,
    protected promotionService?: PromotionService
  ) {}

  ngOnInit() {
    this.cart$ = this.cartService.getActive();
    this.entries$ = this.cartService
      .getEntries()
      .pipe(filter(entries => entries.length > 0));
    this.cartLoaded$ = this.cartService.getLoaded();
    this.orderPromotions$ = this.promotionService.getOrderPromotions(
      this.promotionLocation
    );
  }

  /**
   * @deprecated Since 1.4
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
}
