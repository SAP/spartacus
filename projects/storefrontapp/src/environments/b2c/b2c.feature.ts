import { AsmModule } from '@spartacus/asm';
import {
  storeFinderTranslationChunksConfig,
  storeFinderTranslations,
} from '@spartacus/storefinder/assets';
import {
  asmTranslationChunksConfig,
  asmTranslations,
} from '@spartacus/asm/assets';
import { StoreFinderRootModule } from '@spartacus/storefinder/root';
import { B2cStorefrontModule } from '@spartacus/storefront';
import { FeatureEnvironment } from '../models/feature.model';
import { ConfigModule } from '@spartacus/core';

export const b2cFeature: FeatureEnvironment = {
  imports: [
    AsmModule,
    B2cStorefrontModule.withConfig({
      context: {
        urlParameters: ['baseSite', 'language', 'currency'],
        baseSite: [
          'electronics-spa',
          'electronics',
          'apparel-de',
          'apparel-uk',
          'apparel-uk-spa',
        ],
      },
      cart: {
        selectiveCart: {
          enabled: true,
        },
      },

      featureModules: {
        storeFinder: {
          module: () =>
            import('@spartacus/storefinder').then((m) => m.StoreFinderModule),
        },
      },
      i18n: {
        resources: storeFinderTranslations,
        chunks: storeFinderTranslationChunksConfig,
      },
    }),
    ConfigModule.withConfig({
      i18n: {
        resources: asmTranslations,
        chunks: asmTranslationChunksConfig,
        fallbackLang: 'en',
      },
    }),
    StoreFinderRootModule,
  ],
};
