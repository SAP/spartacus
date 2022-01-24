import { NgModule } from '@angular/core';
import { CheckoutB2BModule } from '@spartacus/checkout/b2b';
import {
  CheckoutB2BAuthGuard,
  CheckoutB2BStepsSetGuard,
} from '@spartacus/checkout/b2b/components';
import {
  CheckoutAuthGuard,
  CheckoutStepsSetGuard,
} from '@spartacus/checkout/base/components';

@NgModule({
  imports: [CheckoutB2BModule],
  providers: [
    {
      provide: CheckoutAuthGuard,
      useExisting: CheckoutB2BAuthGuard,
    },
    {
      provide: CheckoutStepsSetGuard,
      useExisting: CheckoutB2BStepsSetGuard,
    },
  ],
})
export class CheckoutB2BFeatureCustomModule {}
