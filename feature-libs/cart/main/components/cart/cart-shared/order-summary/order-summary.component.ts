import { Component, Input, Optional } from '@angular/core';
import { Cart, Order } from '@spartacus/core';
import { OutletContextData } from '@spartacus/storefront';

@Component({
  selector: 'cx-order-summary',
  templateUrl: './order-summary.component.html',
})
export class OrderSummaryComponent {
  @Input()
  cart: Cart;

  constructor(@Optional() protected outlet?: OutletContextData<Cart | Order>) {
    if (outlet) {
      this.cart = outlet.context;
    }
  }
}
