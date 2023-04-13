import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, provideDefaultConfig } from '@spartacus/core';
import { OpfVerifyPaymentComponent } from './opf-verify-payment.component';

@NgModule({
  declarations: [OpfVerifyPaymentComponent],
  imports: [CommonModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        OpfVerifyPaymentComponent: {
          component: OpfVerifyPaymentComponent,
        },
      },
    }),
  ],
  exports: [OpfVerifyPaymentComponent],
})
export class OpfVerifyPaymentModule {}
