import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, ConfigModule } from '@spartacus/core';
import { CartSharedModule } from '../../../../cms-components/cart/cart-shared/cart-shared.module';
import { CheckoutOrderSummaryComponent } from './checkout-order-summary.component';

@NgModule({
  imports: [
    CommonModule,
    CartSharedModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        CheckoutOrderSummary: {
          component: CheckoutOrderSummaryComponent,
        },
      },
    }),
  ],
  declarations: [CheckoutOrderSummaryComponent],
  entryComponents: [CheckoutOrderSummaryComponent],
  exports: [CheckoutOrderSummaryComponent],
})
export class CheckoutOrderSummaryModule {}
