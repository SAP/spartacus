import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {
  UrlTranslationModule,
  ConfigModule,
  CmsConfig,
  CheckoutModule,
  I18nModule,
} from '@spartacus/core';

import { ShippingAddressModule } from './shipping-address/shipping-address.module';
import { DeliveryModeModule } from './delivery-mode/delivery-mode.module';
import { PaymentMethodModule } from './payment-method/payment-method.module';
import { ReviewSubmitModule } from './review-submit/review-submit.module';
import { MultiStepCheckoutComponent } from './container/multi-step-checkout.component';
import { CartSharedModule } from '../../../cart/cart-shared/cart-shared.module';
import { PlaceOrderModule } from './place-order/place-order.module';
import { CheckoutOrderSummaryModule } from './checkout-order-summary/checkout-order-summary.module';
import { CheckoutOrchestratorModule } from './checkout-orchestrator/checkout-orchestrator.module';

@NgModule({
  imports: [
    CommonModule,
    CartSharedModule,
    ShippingAddressModule,
    DeliveryModeModule,
    PaymentMethodModule,
    ReviewSubmitModule,
    CheckoutOrderSummaryModule,
    PlaceOrderModule,
    RouterModule,
    UrlTranslationModule,
    CheckoutOrchestratorModule,
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
