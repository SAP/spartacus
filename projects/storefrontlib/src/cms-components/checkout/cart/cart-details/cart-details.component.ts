import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { CartService, Cart, OrderEntry } from '@spartacus/core';

import { Observable } from 'rxjs';

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
    this.entries$ = this.cartService.getEntries();
    this.cartLoaded$ = this.cartService.getLoaded();
  }

  getAllPromotionsForCart(cart: Cart): Cart[] {
    const potentialPromotions = cart.potentialOrderPromotions || [];
    const appliedPromotions = cart.appliedOrderPromotions || [];
    return [...potentialPromotions, ...appliedPromotions];
  }
}
