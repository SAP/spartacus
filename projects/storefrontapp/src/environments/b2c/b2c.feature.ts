import {
  asmTranslationChunksConfig,
  asmTranslations,
} from '@spartacus/asm/assets';
import { AsmRootModule } from '@spartacus/asm/root';
import { ConfigModule } from '@spartacus/core';
import {
  storeFinderTranslationChunksConfig,
  storeFinderTranslations,
} from '@spartacus/storefinder/assets';
import { StoreFinderRootModule } from '@spartacus/storefinder/root';
import { B2cStorefrontModule } from '@spartacus/storefront';
import { FeatureEnvironment } from '../models/feature.model';

export const b2cFeature: FeatureEnvironment = {
  imports: [
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
        asm: {
          module: () => import('@spartacus/asm').then((m) => m.AsmModule),
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
    AsmRootModule,
  ],
};
