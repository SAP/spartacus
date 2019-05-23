import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, ConfigModule } from '@spartacus/core';
import { CartSharedModule } from '../../../cart/cart-shared/cart-shared.module';
import { CheckoutOrderSummaryComponent } from './checkout-order-summary.component';

@NgModule({
  imports: [
    CommonModule,
    CartSharedModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        CheckoutOrderSummary: {
          selector: 'cx-checkout-order-summary',
        },
      },
    }),
  ],
  declarations: [CheckoutOrderSummaryComponent],
  entryComponents: [CheckoutOrderSummaryComponent],
  exports: [CheckoutOrderSummaryComponent],
})
export class CheckoutOrderSummaryModule {}
