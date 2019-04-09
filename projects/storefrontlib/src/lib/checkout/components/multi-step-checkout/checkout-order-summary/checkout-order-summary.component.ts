import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { CartService, Cart } from '@spartacus/core';

@Component({
  selector: 'cx-checkout-order-summary',
  templateUrl: './checkout-order-summary.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutOrderSummaryComponent {
  @Input()
  cart: Cart;

  constructor(protected cartService: CartService) {
    this.cartService.getActive().subscribe(cart => {
      this.cart = cart;
    });
  }
}
