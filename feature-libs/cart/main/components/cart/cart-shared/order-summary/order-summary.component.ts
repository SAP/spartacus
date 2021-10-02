import { Component, Input } from '@angular/core';
import { Cart } from '@spartacus/cart/main/root';

@Component({
  selector: 'cx-order-summary',
  templateUrl: './order-summary.component.html',
})
export class OrderSummaryComponent {
  @Input()
  cart: Cart;
}
