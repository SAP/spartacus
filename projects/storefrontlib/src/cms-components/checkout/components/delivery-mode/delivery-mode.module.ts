import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CmsConfig, ConfigModule, I18nModule } from '@spartacus/core';
import { SpinnerModule } from '../../../../shared/components/spinner/spinner.module';
import { CheckoutAuthGuard } from '../../guards/checkout-auth.guard';
import { ShippingAddressSetGuard } from '../../guards/shipping-address-set.guard';
import { CartNotEmptyGuard } from './../../../../cms-components/cart/cart-not-empty.guard';
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
          component: DeliveryModeComponent,
          guards: [
            CheckoutAuthGuard,
            CartNotEmptyGuard,
            ShippingAddressSetGuard,
          ],
        },
      },
    }),
  ],
  declarations: [DeliveryModeComponent],
  entryComponents: [DeliveryModeComponent],
  exports: [DeliveryModeComponent],
})
export class DeliveryModeModule {}
