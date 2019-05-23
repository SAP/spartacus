import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  AuthGuard,
  CmsConfig,
  ConfigModule,
  I18nModule,
} from '@spartacus/core';
import { SpinnerModule } from '../../../../shared/components/spinner/spinner.module';
import { CartNotEmptyGuard } from '../../../cart/cart-not-empty.guard';
import { ShippingAddressSetGuard } from '../../guards/shipping-address-set.guard';
import { DeliveryModeComponent } from './delivery-mode.component';

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
