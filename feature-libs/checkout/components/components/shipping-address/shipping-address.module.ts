import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import {
  AddressFormModule,
  CardModule,
  CartNotEmptyGuard,
  SpinnerModule,
} from '@spartacus/storefront';
import { CheckoutAuthGuard } from '../../guards/checkout-auth.guard';
import { ShippingAddressComponent } from './shipping-address.component';

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
        CheckoutShippingAddress: {
          component: ShippingAddressComponent,
          guards: [CheckoutAuthGuard, CartNotEmptyGuard],
        },
      },
    }),
  ],
  declarations: [ShippingAddressComponent],
  entryComponents: [ShippingAddressComponent],
  exports: [ShippingAddressComponent],
})
export class ShippingAddressModule {}
