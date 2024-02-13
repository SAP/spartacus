import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cx-opf-cart-proceed-to-checkout',
  templateUrl: './opf-cart-proceed-to-checkout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpfCartProceedToCheckoutComponent {
  constructor() {
    console.log('inside OpfCartProceedToCheckoutComponent');
  }
}
