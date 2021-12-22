import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckoutAuthGuard } from '@spartacus/checkout/base/root';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { SpinnerModule } from '@spartacus/storefront';
import { CartNotEmptyGuard } from '../guards/cart-not-empty.guard';
import { CheckoutDeliveryModeComponent } from './checkout-delivery-mode.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, I18nModule, SpinnerModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        CheckoutDeliveryMode: {
          component: CheckoutDeliveryModeComponent,
          // TODO(#8880): Shouldn't we keep ShippingAddressSetGuard here?
          guards: [CheckoutAuthGuard, CartNotEmptyGuard],
        },
      },
    }),
  ],
  declarations: [CheckoutDeliveryModeComponent],
  exports: [CheckoutDeliveryModeComponent],
})
export class CheckoutDeliveryModeModule {}
