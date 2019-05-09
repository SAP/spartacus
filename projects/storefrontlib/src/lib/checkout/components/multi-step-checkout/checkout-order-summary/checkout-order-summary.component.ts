import { Component, ChangeDetectionStrategy } from '@angular/core';

import { CartService, UICart } from '@spartacus/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-checkout-order-summary',
  templateUrl: './checkout-order-summary.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutOrderSummaryComponent {
  cart$: Observable<UICart>;

  constructor(protected cartService: CartService) {
    this.cart$ = this.cartService.getActive();
  }
}
