import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Cart, CartService, OrderEntry } from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'cx-cart-details',
  templateUrl: './cart-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartDetailsComponent implements OnInit {
  cart$: Observable<Cart>;
  entries$: Observable<OrderEntry[]>;
  cartLoaded$: Observable<boolean>;

  constructor(protected cartService: CartService) {}

  ngOnInit() {
    this.cart$ = this.cartService.getActive();
    this.entries$ = this.cartService
      .getEntries()
      .pipe(filter(entries => entries.length > 0));
    this.cartLoaded$ = this.cartService.getLoaded();
  }

  getAllPromotionsForCart(cart: Cart): Cart[] {
    let potentialPromotions = [];
    if (cart.potentialOrderPromotions) {
      potentialPromotions.push(...cart.potentialOrderPromotions);
    }
    if (cart.potentialProductPromotions) {
      potentialPromotions.push(...cart.potentialProductPromotions);
    }

    let appliedPromotions = [];
    if (cart.appliedOrderPromotions) {
      appliedPromotions.push(...cart.appliedOrderPromotions);
    }
    if (cart.appliedProductPromotions) {
      appliedPromotions.push(...cart.appliedProductPromotions);
    }

    return [...potentialPromotions, ...appliedPromotions];
  }
}
