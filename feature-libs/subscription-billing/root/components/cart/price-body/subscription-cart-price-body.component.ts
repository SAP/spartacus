/* eslint-disable linebreak-style */
import { CommonModule } from '@angular/common';
import { Component, Inject, Optional } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CartItemContext } from '@spartacus/cart/base/root';

@Component({
  selector: 'cx-subscription-cart-price-body',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './subscription-cart-price-body.component.html',
})
export class SubscriptionCartPriceBodyComponent {
  subscriptionItem = toSignal(this.cartItemContext?.item$);
  constructor(
    @Optional()
    @Inject(CartItemContext)
    protected cartItemContext: CartItemContext
  ) {}

}
