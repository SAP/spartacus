import { Component, Input } from '@angular/core';
import { Cart } from '@spartacus/core';

@Component({
  selector: 'cx-order-summary',
  templateUrl: './order-summary.component.html',
})
export class OrderSummaryComponent {
  @Input()
  cart: Cart;

  getAllAppliedPromotions() {
    let appliedPromotions = [];
    if (this.cart.appliedOrderPromotions) {
      appliedPromotions.push(...this.cart.appliedOrderPromotions);
    }
    if (this.cart.appliedProductPromotions) {
      appliedPromotions.push(...this.cart.appliedProductPromotions);
    }
    return appliedPromotions;
  }
}
