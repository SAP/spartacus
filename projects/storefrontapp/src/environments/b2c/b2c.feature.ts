import { ConfigModule } from '@spartacus/core';
import { configuratorTranslations } from '@spartacus/product-configurator/common/assets';
import { RulebasedConfiguratorRootModule } from '@spartacus/product-configurator/rulebased/root';
import { TextfieldConfiguratorRootModule } from '@spartacus/product-configurator/textfield/root';
import {
  storeFinderTranslationChunksConfig,
  storeFinderTranslations,
} from '@spartacus/storefinder/assets';
import { StoreFinderRootModule } from '@spartacus/storefinder/root';
import { B2cStorefrontModule, StorefrontConfig } from '@spartacus/storefront';
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
      },
      i18n: {
        resources: storeFinderTranslations,
        chunks: storeFinderTranslationChunksConfig,
      },
    }),
    StoreFinderRootModule,

    // PRODUCT CONFIGURATOR
    ConfigModule.withConfig(<StorefrontConfig>{
      i18n: { resources: configuratorTranslations },
      featureModules: {
        rulebased: {
          module: () =>
            import('@spartacus/product-configurator/rulebased').then(
              (m) => m.RulebasedConfiguratorModule
            ),
        },
        textfield: {
          module: () =>
            import('@spartacus/product-configurator/textfield').then(
              (m) => m.TextfieldConfiguratorModule
            ),
        },
      },
    }),
    RulebasedConfiguratorRootModule,
    TextfieldConfiguratorRootModule,
    // PRODUCT CONFIGURATOR END
  ],
};
