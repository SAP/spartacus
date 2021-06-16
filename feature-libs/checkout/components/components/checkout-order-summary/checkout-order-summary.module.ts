import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, provideDefaultConfig } from '@spartacus/core';
import { CartSharedModule } from '@spartacus/storefront';
import { CheckoutOrderSummaryComponent } from './checkout-order-summary.component';

@NgModule({
  imports: [CommonModule, CartSharedModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        CheckoutOrderSummary: {
          component: CheckoutOrderSummaryComponent,
        },
      },
    }),
  ],
  declarations: [CheckoutOrderSummaryComponent],
  exports: [CheckoutOrderSummaryComponent],
})
export class CheckoutOrderSummaryModule {}
