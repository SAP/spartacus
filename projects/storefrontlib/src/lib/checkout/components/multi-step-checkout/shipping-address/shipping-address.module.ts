import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { I18nModule } from '@spartacus/core';
import { AddressFormModule } from './address-form/address-form.module';
import { CardModule } from '../../../../ui/components/card/card.module';
import { ShippingAddressComponent } from './shipping-address.component';
import { SpinnerModule } from './../../../../ui/components/spinner/spinner.module';
import { ConfigModule, CmsConfig } from '@spartacus/core';

import { CheckoutProgressMobileTopModule } from './../checkout-progress/checkout-progress-mobile-top/checkout-progress-mobile-top.module';
// tslint:disable-next-line:max-line-length
import { CheckoutProgressMobileBottomModule } from './../checkout-progress/checkout-progress-mobile-bottom/checkout-progress-mobile-bottom.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AddressFormModule,
    CardModule,
    SpinnerModule,
    I18nModule,
    CheckoutProgressMobileTopModule,
    CheckoutProgressMobileBottomModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        MultistepCheckoutShippingAddress: {
          selector: 'cx-shipping-address',
        },
      },
    }),
  ],
  declarations: [ShippingAddressComponent],
  entryComponents: [ShippingAddressComponent],
  exports: [ShippingAddressComponent],
})
export class ShippingAddressModule {}
