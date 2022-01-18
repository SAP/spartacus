import { OccDigitalPaymentsAdapter } from './adapters/occ-digital-payments.adapter';
import { OccDpDetailsNormalizer } from './adapters/occ-digital-payment-details.normalizer';
import { OccDpRequestNormalizer } from './adapters/occ-digital-payment-request.normalizer';
import { DpPaymentMethodModule } from './cms-components/dp-payment-method/dp-payment-method.module';
import { NgModule } from '@angular/core';
import { DigitalPaymentsAdapter } from './adapters/digital-payments.adapter';
import { provideDefaultConfig } from '@spartacus/core';
import { occDigitalPaymentsConfig } from './adapters/config/occ-digital-payments-endpoint.config';
import {
  DP_DETAILS_NORMALIZER,
  DP_REQUEST_NORMALIZER,
} from './adapters/converters';

@NgModule({
  imports: [DpPaymentMethodModule],
  providers: [
    {
      provide: DigitalPaymentsAdapter,
      useClass: OccDigitalPaymentsAdapter,
    },
    {
      provide: DP_DETAILS_NORMALIZER,
      useExisting: OccDpDetailsNormalizer,
      multi: true,
    },
    {
      provide: DP_REQUEST_NORMALIZER,
      useExisting: OccDpRequestNormalizer,
      multi: true,
    },
    provideDefaultConfig(occDigitalPaymentsConfig),
  ],
})
export class DpCheckoutModule {}
