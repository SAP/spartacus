import { NgModule } from '@angular/core';
import { CmsConfig, provideConfig, I18nConfig } from "@spartacus/core";
import { DigitalPaymentsModule, DIGITAL_PAYMENTS_FEATURE } from '@spartacus/digital-payments';
import { dpTranslationChunksConfig, dpTranslations } from '@spartacus/digital-payments';
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
    provideConfig(<I18nConfig>{
      i18n: {
        resources: dpTranslations,
        chunks: dpTranslationChunksConfig,
      },
    }),
  ],
})
export class DigitalPaymentsFeatureModule {}
