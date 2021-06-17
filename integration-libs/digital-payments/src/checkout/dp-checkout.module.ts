import { OccDigitalPaymentsAdapter } from './adapters/occ-digital-payments.adapter';
import { DigitalPaymentsStoreModule } from './store/digital-payments-store.module';
import { DpPaymentMethodModule } from './cms-components/dp-payment-method/dp-payment-method.module';
import { NgModule } from '@angular/core';
import { DigitalPaymentsAdapter } from './adapters/digital-payments.adapter';

@NgModule({
  imports: [DpPaymentMethodModule, DigitalPaymentsStoreModule],
  providers: [
    {
      provide: DigitalPaymentsAdapter,
      useClass: OccDigitalPaymentsAdapter,
    },
  ],
})
export class DpCheckoutModule {}
