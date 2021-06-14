import { I18nModule } from '@spartacus/core';
import { DpCheckoutPaymentService } from '../../../facade';
import { SpinnerModule } from '@spartacus/storefront';
import { DpPaymentCallbackComponent } from './dp-payment-callback.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, SpinnerModule, I18nModule],
  declarations: [DpPaymentCallbackComponent],
  entryComponents: [DpPaymentCallbackComponent],
  exports: [DpPaymentCallbackComponent],
  providers: [DpCheckoutPaymentService],
})
export class DpPaymentCallbackModule {}
