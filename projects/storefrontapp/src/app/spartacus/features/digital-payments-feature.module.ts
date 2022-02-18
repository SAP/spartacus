import { ModuleWithProviders, NgModule } from '@angular/core';
import { CHECKOUT_FEATURE } from '@spartacus/checkout/base/root';
import { I18nConfig, provideConfig } from '@spartacus/core';
import {
  dpTranslationChunksConfig,
  dpTranslations,
} from '@spartacus/digital-payments/assets';
@NgModule({
  providers: [
    provideConfig(<I18nConfig>{
      i18n: {
        resources: dpTranslations,
        chunks: dpTranslationChunksConfig,
        fallbackLang: 'en',
      },
    }),
  ],
})
export class DigitalPaymentsFeatureModule {
  static forB2C(): ModuleWithProviders<DigitalPaymentsFeatureModule> {
    return {
      ngModule: DigitalPaymentsFeatureModule,
      providers: [
        provideConfig({
          featureModules: {
            [CHECKOUT_FEATURE]: {
              module: () =>
                import('@spartacus/digital-payments').then(
                  (m) => m.DigitalPaymentsModule
                ),
            },
          },
        }),
      ],
    };
  }

  static forB2B(): ModuleWithProviders<DigitalPaymentsFeatureModule> {
    return {
      ngModule: DigitalPaymentsFeatureModule,
      providers: [
        provideConfig({
          featureModules: {
            [CHECKOUT_FEATURE]: {
              module: () =>
                import('@spartacus/digital-payments/b2b').then(
                  (m) => m.B2BDigitalPaymentsModule
                ),
            },
          },
        }),
      ],
    };
  }

  static forScheduledReplenishment(): ModuleWithProviders<DigitalPaymentsFeatureModule> {
    return {
      ngModule: DigitalPaymentsFeatureModule,
      providers: [
        provideConfig({
          featureModules: {
            [CHECKOUT_FEATURE]: {
              module: () =>
                import(
                  '@spartacus/digital-payments/scheduled-replenishment'
                ).then((m) => m.ReplenishmentDigitalPaymentsModule),
            },
          },
        }),
      ],
    };
  }
}
