import { OccDigitalPaymentsAdapter } from './adapters/occ-digital-payments.adapter';
import { DpPaymentMethodModule } from './cms-components/dp-payment-method/dp-payment-method.module';
import { NgModule } from '@angular/core';
import { DigitalPaymentsAdapter } from './adapters/digital-payments.adapter';
import { provideDefaultConfig } from '@spartacus/core';
import { occDigitalPaymentsConfig } from './adapters/config/occ-digital-payments-endpoint.config';

@NgModule({
  imports: [DpPaymentMethodModule],
  providers: [
    {
      provide: DigitalPaymentsAdapter,
      useClass: OccDigitalPaymentsAdapter,
    },
    provideDefaultConfig(occDigitalPaymentsConfig),
  ],
})
export class DpCheckoutModule {}
