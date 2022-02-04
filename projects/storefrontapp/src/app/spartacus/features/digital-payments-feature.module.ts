import { NgModule } from '@angular/core';
import { CHECKOUT_FEATURE } from '@spartacus/checkout/root';
import { I18nConfig, provideConfig } from '@spartacus/core';
import {
  dpTranslationChunksConfig,
  dpTranslations,
} from '@spartacus/digital-payments/assets';
@NgModule({
  providers: [
    provideConfig(<I18nConfig>{
      featureModules: {
        [CHECKOUT_FEATURE]: {
          module: () =>
            import('@spartacus/digital-payments').then(
              (m) => m.DigitalPaymentsModule
            ),
        },
      },
      i18n: {
        resources: dpTranslations,
        chunks: dpTranslationChunksConfig,
        fallbackLang: 'en',
      },
    }),
  ],
})
export class DigitalPaymentsFeatureModule {}
