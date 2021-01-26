import { PersonalizationRootModule } from '@spartacus/personalization/root';
import { QualtricsRootModule } from '@spartacus/qualtrics/root';
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
        qualtrics: {
          module: () =>
            import('@spartacus/qualtrics').then((m) => m.QualtricsModule),
        },
        personalization: {
          module: () =>
            import('@spartacus/personalization').then(
              (m) => m.PersonalizationModule
            ),
        },
      },
      i18n: {
        resources: storeFinderTranslations,
        chunks: storeFinderTranslationChunksConfig,
      },
    }),
    StoreFinderRootModule,
    QualtricsRootModule,
    PersonalizationRootModule,
  ],
};
