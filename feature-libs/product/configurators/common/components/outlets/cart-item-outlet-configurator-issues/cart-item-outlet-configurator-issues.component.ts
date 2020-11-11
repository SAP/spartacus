import { Component, Optional } from '@angular/core';
import { CartItemContext } from '@spartacus/storefront';

@Component({
  selector: 'cx-cart-item-outlet-configurator-issues',
  templateUrl: './cart-item-outlet-configurator-issues.component.html',
})
export class CartItemOutletConfiguratorIssuesComponent {
  constructor(
    @Optional()
    public cartItem?: CartItemContext
  ) {}
}
