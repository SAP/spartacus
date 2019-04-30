import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigModule, CmsConfig } from '@spartacus/core';
import { CartSharedModule } from '../../../../../cms-components/checkout/cart/cart-shared/cart-shared.module';
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
