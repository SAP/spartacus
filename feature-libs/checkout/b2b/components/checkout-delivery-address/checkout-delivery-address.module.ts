import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartValidationGuard } from '@spartacus/cart/main/core';
import {
  CartNotEmptyGuard,
  CheckoutAuthGuard,
} from '@spartacus/checkout/base/components';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import {
  AddressFormModule,
  CardModule,
  SpinnerModule,
} from '@spartacus/storefront';
import { B2BCheckoutDeliveryAddressComponent } from './checkout-delivery-address.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AddressFormModule,
    CardModule,
    SpinnerModule,
    I18nModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        // TODO:#checkout - Update to CheckoutDeliveryAddress cms mapping
        CheckoutShippingAddress: {
          component: B2BCheckoutDeliveryAddressComponent,
          guards: [CheckoutAuthGuard, CartNotEmptyGuard, CartValidationGuard],
        },
      },
    }),
  ],
  declarations: [B2BCheckoutDeliveryAddressComponent],
  exports: [B2BCheckoutDeliveryAddressComponent],
})
export class B2BCheckoutDeliveryAddressModule {}
