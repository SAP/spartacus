import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShippingAddressModule } from './shipping-address/shipping-address.module';
import { DeliveryModeModule } from './delivery-mode/delivery-mode.module';
import { PaymentMethodModule } from './payment-method/payment-method.module';
import { ReviewSubmitModule } from './review-submit/review-submit.module';

import { MultiStepCheckoutComponent } from './container/multi-step-checkout.component';
import { CartSharedModule } from '../../../cart/cart-shared/cart-shared.module';
import { RouterModule } from '@angular/router';
import { UrlTranslationModule, ConfigModule, CmsConfig } from '@spartacus/core';

@NgModule({
  imports: [
    CommonModule,
    CartSharedModule,

    ShippingAddressModule,
    DeliveryModeModule,
    PaymentMethodModule,
    ReviewSubmitModule,
    RouterModule,
    UrlTranslationModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        MultiStepCheckoutComponent: { selector: 'cx-multi-step-checkout' }
      }
    })
  ],
  declarations: [MultiStepCheckoutComponent],
  entryComponents: [MultiStepCheckoutComponent]
})
export class MultiStepCheckoutModule {}
