import { Component, ChangeDetectionStrategy } from '@angular/core';

import { CartService, Cart } from '@spartacus/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-checkout-order-summary',
  templateUrl: './checkout-order-summary.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutOrderSummaryComponent {
  cart$: Observable<Cart>;

  constructor(protected cartService: CartService) {
    this.cart$ = this.cartService.getActive();
  }
}
