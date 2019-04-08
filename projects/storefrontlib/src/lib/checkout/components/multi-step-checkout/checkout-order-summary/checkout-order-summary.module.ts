import { NgModule } from '@angular/core';

import { CartSharedModule } from '../../../../cart/cart-shared/cart-shared.module';
import { ConfigModule, CmsConfig } from '@spartacus/core';
import { CheckoutOrderSummaryComponent } from './checkout-order-summary.component';

@NgModule({
  imports: [
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
