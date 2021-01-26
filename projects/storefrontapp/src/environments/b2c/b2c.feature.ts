import { B2cStorefrontModule } from '@spartacus/storefront';
import { FeatureEnvironment } from '../models/feature.model';
import { StoreFinderRootModule } from '@spartacus/storefinder/root';
import {
  storeFinderTranslationChunksConfig,
  storeFinderTranslations,
} from '@spartacus/storefinder/assets';
import { VariantsRootModule } from '@spartacus/product/variants/root';

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

        variants: {
          module: () =>
            import('@spartacus/product/variants').then((m) => m.VariantsModule),
        },
      },
      i18n: {
        resources: storeFinderTranslations,
        chunks: storeFinderTranslationChunksConfig,
      },
    }),
    StoreFinderRootModule,
    VariantsRootModule,
  ],
};
