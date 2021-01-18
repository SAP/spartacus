import {
  storeFinderTranslationChunksConfig,
  storeFinderTranslations,
} from '@spartacus/storefinder/assets';
import { StoreFinderRootModule } from '@spartacus/storefinder/root';
import { B2cStorefrontModule } from '@spartacus/storefront';
import { UserDetailsRootModule } from '@spartacus/user/details';
import {
  userTranslationChunksConfig,
  userTranslations,
} from 'feature-libs/user/profile/assets/public_api';
import { UserProfileRootModule } from 'feature-libs/user/profile/root/public_api';
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
        userDetails: {
          module: () =>
            import('@spartacus/user/details').then((m) => m.UserDetailsModule),
        },
        userProfile: {
          module: () =>
            import('@spartacus/user/profile').then((m) => m.UserProfileModule),
        },
      },
      i18n: {
        resources: { ...storeFinderTranslations, ...userTranslations },
        chunks: {
          ...storeFinderTranslationChunksConfig,
          ...userTranslationChunksConfig,
        },
      },
    }),

    StoreFinderRootModule,
    UserDetailsRootModule,
    UserProfileRootModule,
  ],
};
