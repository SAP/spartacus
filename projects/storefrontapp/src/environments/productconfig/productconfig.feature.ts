import { ConfigModule } from '@spartacus/core';
import { configuratorTranslations } from '@spartacus/product-configurator/common/assets';
import { RulebasedConfiguratorRootModule } from '@spartacus/product-configurator/rulebased/root';
import { TextfieldConfiguratorRootModule } from '@spartacus/product-configurator/textfield/root';
import { FeatureEnvironment } from '../models/feature.model';

export const productConfigFeature: FeatureEnvironment = {
  imports: [
    ConfigModule.withConfig({
      i18n: {
        resources: configuratorTranslations,
      },
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
  ],
};
