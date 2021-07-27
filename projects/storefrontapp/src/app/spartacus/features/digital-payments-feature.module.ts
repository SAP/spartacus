import { NgModule } from '@angular/core';
import { CmsConfig, provideConfig } from "@spartacus/core";
import { DigitalPaymentsModule, DIGITAL_PAYMENTS_FEATURE } from '@spartacus/digital-payments';

@NgModule({
  imports: [DigitalPaymentsModule],
  providers: [
    provideConfig(<CmsConfig>{
      featureModules: {
        [DIGITAL_PAYMENTS_FEATURE]: {
          module: () => import('@spartacus/digital-payments').then((m) => m.DigitalPaymentsModule),
        },
      },
    }),
  ],
})
export class DigitalPaymentsFeatureModule {}
