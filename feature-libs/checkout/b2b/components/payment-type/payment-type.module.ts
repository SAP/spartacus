import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  CartNotEmptyGuard,
  CheckoutAuthGuard,
} from '@spartacus/checkout/components';
import { CmsConfig, ConfigModule, I18nModule } from '@spartacus/core';
import { SpinnerModule } from '@spartacus/storefront';
import { PaymentTypeComponent } from './payment-type.component';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    SpinnerModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        CheckoutPaymentType: {
          component: PaymentTypeComponent,
          guards: [CheckoutAuthGuard, CartNotEmptyGuard],
        },
      },
    }),
  ],
  declarations: [PaymentTypeComponent],
  exports: [PaymentTypeComponent],
})
export class PaymentTypeModule {}
