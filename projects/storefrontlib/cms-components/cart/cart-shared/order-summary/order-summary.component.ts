import { Component, Input } from '@angular/core';
import { Cart } from '@spartacus/core';

/**
 * @deprecated since 4.1 - use cart lib instead
 */
@Component({
  selector: 'cx-order-summary',
  templateUrl: './order-summary.component.html',
})
export class OrderSummaryComponent {
  @Input()
  cart: Cart;
}
