import { NgModule } from '@angular/core';
import { CheckoutStepsSetGuard } from '@spartacus/checkout/base/components';
import { CheckoutServiceOrderStepsSetGuard } from './guards';
import { ServiceCheckoutReviewSubmitModule } from './checkout-review-submit/service-checkout-review-submit.module';
import { CheckoutServiceDetailsModule } from './checkout-service-details/checkout-service-details.module';

@NgModule({
  imports: [ServiceCheckoutReviewSubmitModule, CheckoutServiceDetailsModule],
  providers: [
    {
      provide: CheckoutStepsSetGuard,
      useExisting: CheckoutServiceOrderStepsSetGuard,
    },
  ],
})
export class S4ServiceCheckoutComponentModule {}
