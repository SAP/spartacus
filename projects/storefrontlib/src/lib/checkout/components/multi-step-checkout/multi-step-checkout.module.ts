import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
  CheckoutModule,
  CmsConfig,
  ConfigModule,
  I18nModule,
  UrlTranslationModule,
} from '@spartacus/core';
import { ShippingAddressModule } from './shipping-address/shipping-address.module';
import { DeliveryModeModule } from './delivery-mode/delivery-mode.module';
import { PaymentMethodModule } from './payment-method/payment-method.module';
import { ReviewSubmitModule } from './review-submit/review-submit.module';
import { PlaceOrderModule } from './place-order/place-order.module';
import { MultiStepCheckoutComponent } from './container/multi-step-checkout.component';
import { CheckoutOrderSummaryModule } from './checkout-order-summary/checkout-order-summary.module';
import { CheckoutOrchestratorModule } from './checkout-orchestrator/checkout-orchestrator.module';
import { CheckoutProgressModule } from './checkout-progress/checkout-progress.module';
import { CartSharedModule } from '../../../../cms-components/checkout/cart/cart-shared/cart-shared.module';

@NgModule({
  imports: [
    CommonModule,
    CartSharedModule,
    ShippingAddressModule,
    DeliveryModeModule,
    PaymentMethodModule,
    ReviewSubmitModule,
    PlaceOrderModule,
    CheckoutOrderSummaryModule,
    PlaceOrderModule,
    RouterModule,
    UrlTranslationModule,
    CheckoutOrchestratorModule,
    CheckoutProgressModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        MultiStepCheckoutComponent: { selector: 'cx-multi-step-checkout' },
      },
    }),
    CheckoutModule,
    I18nModule,
  ],
  declarations: [MultiStepCheckoutComponent],
  entryComponents: [MultiStepCheckoutComponent],
})
export class MultiStepCheckoutModule {}
