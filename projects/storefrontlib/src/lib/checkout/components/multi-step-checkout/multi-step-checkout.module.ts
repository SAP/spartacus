import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
  CheckoutModule,
  CmsConfig,
  ConfigModule,
  I18nModule,
  UrlModule,
} from '@spartacus/core';
import { CartSharedModule } from '../../../../cms-components/checkout/cart/cart-shared/cart-shared.module';
import { MultiStepCheckoutComponent } from './container/multi-step-checkout.component';
import { DeliveryModeModule } from './delivery-mode/delivery-mode.module';
import { PaymentMethodModule } from './payment-method/payment-method.module';
import { ReviewSubmitModule } from './review-submit/review-submit.module';
import { ShippingAddressModule } from './shipping-address/shipping-address.module';
import { PlaceOrderModule } from './place-order/place-order.module';

@NgModule({
  imports: [
    CommonModule,
    CartSharedModule,
    ShippingAddressModule,
    DeliveryModeModule,
    PaymentMethodModule,
    ReviewSubmitModule,
    PlaceOrderModule,
    RouterModule,
    UrlModule,
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
