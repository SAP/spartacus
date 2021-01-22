import {
  storeFinderTranslationChunksConfig,
  storeFinderTranslations,
} from '@spartacus/storefinder/assets';
import { StoreFinderRootModule } from '@spartacus/storefinder/root';
import { B2cStorefrontModule } from '@spartacus/storefront';
import { UserProfileRootModule } from '@spartacus/user/profile/root';
import { UserAccountRootModule } from 'feature-libs/user/account/root/public_api';
import {
  userProfileTranslations,
  userTranslationChunksConfig,
} from 'feature-libs/user/profile/assets/public_api';
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
            import('feature-libs/user/account/public_api').then(
              (m) => m.UserAccountModule
            ),
        },
        userProfile: {
          module: () =>
            import('@spartacus/user/profile').then((m) => m.UserProfileModule),
        },
      },
      i18n: {
        resources: {
          ...storeFinderTranslations,
          ...userProfileTranslations,
        },
        chunks: {
          ...storeFinderTranslationChunksConfig,
          ...userTranslationChunksConfig,
        },
      },
    }),

    StoreFinderRootModule,
    UserAccountRootModule,
    UserProfileRootModule,
  ],
};
