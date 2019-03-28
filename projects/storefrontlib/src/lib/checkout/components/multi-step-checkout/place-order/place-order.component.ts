import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CheckoutService } from '@spartacus/core';

@Component({
  selector: 'cx-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaceOrderComponent {
  tAndCToggler = false;

  constructor(private checkoutService: CheckoutService) {}

  toggleTAndC(): void {
    this.tAndCToggler = !this.tAndCToggler;
  }

  placeOrder(): void {
    this.checkoutService.placeOrder();
  }
}
