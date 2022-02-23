import { NgModule } from '@angular/core';
import { CHECKOUT_FEATURE } from '@spartacus/checkout/base/root';
import { CmsConfig, I18nConfig, provideConfig } from '@spartacus/core';
import {
  dpTranslationChunksConfig,
  dpTranslations,
} from '@spartacus/digital-payments/assets';
@NgModule({
  providers: [
    provideConfig(<CmsConfig>{
      featureModules: {
        [CHECKOUT_FEATURE]: {
          module: () =>
            import('./replenishment-digital-payments.module').then(
              (m) => m.ReplenishmentDigitalPaymentsModule
            ),
        },
      },
    }),
    provideConfig(<I18nConfig>{
      i18n: {
        resources: dpTranslations,
        chunks: dpTranslationChunksConfig,
        fallbackLang: 'en',
      },
    }),
  ],
})
export class CheckoutReplenishmentDpFeatureModule {}
