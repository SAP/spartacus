import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  CheckoutProgressComponent,
  CheckoutStepService,
} from '@spartacus/checkout/base/components';

@Component({
  selector: 'cx-checkout-progress',
  templateUrl: './checkout-progress.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class B2BCheckoutProgressComponent extends CheckoutProgressComponent {
  constructor(protected checkoutStepService: CheckoutStepService) {
    super(checkoutStepService);
  }
}
