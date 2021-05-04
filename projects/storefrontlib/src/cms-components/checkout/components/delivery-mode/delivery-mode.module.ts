import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { SpinnerModule } from '../../../../shared/components/spinner/spinner.module';
import { CheckoutAuthGuard } from '../../guards/checkout-auth.guard';
import { CartNotEmptyGuard } from './../../../../cms-components/cart/cart-not-empty.guard';
import { DeliveryModeComponent } from './delivery-mode.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, I18nModule, SpinnerModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        CheckoutDeliveryMode: {
          component: DeliveryModeComponent,
          // TODO(#8880): Shouldn't we keep ShippingAddressSetGuard here?
          guards: [CheckoutAuthGuard, CartNotEmptyGuard],
        },
      },
    }),
  ],
  declarations: [DeliveryModeComponent],
  exports: [DeliveryModeComponent],
})
export class DeliveryModeModule {}
