import { OccDigitalPaymentsAdapter } from './adapters/occ-digital-payments.adapter';
import { DpPaymentMethodModule } from './cms-components/dp-payment-method/dp-payment-method.module';
import { NgModule } from '@angular/core';
import { DigitalPaymentsAdapter } from './adapters/digital-payments.adapter';

@NgModule({
  imports: [DpPaymentMethodModule],
  providers: [
    {
      provide: DigitalPaymentsAdapter,
      useClass: OccDigitalPaymentsAdapter,
    },
  ],
})
export class DpCheckoutModule {}
