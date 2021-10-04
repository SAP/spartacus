import { Component, Input, Optional } from '@angular/core';
import { Cart } from '@spartacus/cart/main/root';
import { Order } from '@spartacus/core';
import { OutletContextData } from '@spartacus/storefront';

@Component({
  selector: 'cx-order-summary',
  templateUrl: './order-summary.component.html',
})
export class OrderSummaryComponent {
  @Input()
  cart: Cart;

  constructor(@Optional() protected outlet?: OutletContextData<Cart | Order>) {
    if (outlet?.context) {
      this.cart = outlet.context;
    }
  }
}
