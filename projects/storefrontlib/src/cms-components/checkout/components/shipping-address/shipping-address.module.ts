import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CmsConfig, ConfigModule, I18nModule } from '@spartacus/core';
import { CardModule } from '../../../../shared/components/card/card.module';
import { SpinnerModule } from '../../../../shared/components/spinner/spinner.module';
import { CheckoutAuthGuard } from '../../guards/checkout-auth.guard';
// tslint:disable-next-line:max-line-length
import { CheckoutProgressMobileBottomModule } from '../checkout-progress/checkout-progress-mobile-bottom/checkout-progress-mobile-bottom.module';
import { CheckoutProgressMobileTopModule } from '../checkout-progress/checkout-progress-mobile-top/checkout-progress-mobile-top.module';
import { CartNotEmptyGuard } from './../../../../cms-components/cart/cart-not-empty.guard';
import { AddressFormModule } from './address-form/address-form.module';
import { CheckoutDetailsLoadedGuard } from '../../guards/checkout-details-loaded.guard';
import { ShippingAddressComponent } from './shipping-address.component';

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
        CheckoutShippingAddress: {
          component: ShippingAddressComponent,
          guards: [
            CheckoutAuthGuard,
            CartNotEmptyGuard,
            CheckoutDetailsLoadedGuard,
          ],
        },
      },
    }),
  ],
  declarations: [ShippingAddressComponent],
  entryComponents: [ShippingAddressComponent],
  exports: [ShippingAddressComponent],
})
export class ShippingAddressModule {}
