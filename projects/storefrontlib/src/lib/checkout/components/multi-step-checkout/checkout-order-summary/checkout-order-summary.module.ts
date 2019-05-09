import { NgModule } from '@angular/core';

import { ConfigModule, CmsConfig } from '@spartacus/core';
import { CheckoutOrderSummaryComponent } from './checkout-order-summary.component';
import { CommonModule } from '@angular/common';
import { CartSharedModule } from '../../../../../cms-components/checkout/cart/cart-shared/cart-shared.module';

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
