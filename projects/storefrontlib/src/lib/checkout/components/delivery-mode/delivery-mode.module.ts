import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import {
  ConfigModule,
  CmsConfig,
  I18nModule,
  AuthGuard,
} from '@spartacus/core';
import { DeliveryModeComponent } from './delivery-mode.component';
import { ShippingAddressSetGuard } from '../../guards/shipping-address-set.guard';
import { SpinnerModule } from '../../../../shared/components/spinner/spinner.module';
import { CartNotEmptyGuard } from './../../../../cms-components/checkout/cart/cart-not-empty.guard';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    I18nModule,
    SpinnerModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        CheckoutDeliveryMode: {
          selector: 'cx-delivery-mode',
          guards: [AuthGuard, CartNotEmptyGuard, ShippingAddressSetGuard],
        },
      },
    }),
  ],
  declarations: [DeliveryModeComponent],
  entryComponents: [DeliveryModeComponent],
  exports: [DeliveryModeComponent],
})
export class DeliveryModeModule {}
