import { translations } from '@spartacus/assets';
import { ConfigModule } from '@spartacus/core';
import { configuratorTranslations } from '@spartacus/product/configurators/common/assets';
import { RulebasedConfiguratorRootModule } from '@spartacus/product/configurators/rulebased/root';
import { TextfieldConfiguratorRootModule } from '@spartacus/product/configurators/textfield/root';
import { FeatureEnvironment } from '../models/feature.model';

export const productConfigFeature: FeatureEnvironment = {
  imports: [
    ConfigModule.withConfig({
      i18n: {
        resources: {
          en: { ...translations.en, ...configuratorTranslations.en },
        },

        fallbackLang: 'en',
      },
      featureModules: {
        rulebased: {
          module: () =>
            import('@spartacus/product/configurators/rulebased').then(
              (m) => m.RulebasedConfiguratorModule
            ),
        },
        textfield: {
          module: () =>
            import('@spartacus/product/configurators/textfield').then(
              (m) => m.TextfieldConfiguratorModule
            ),
        },
      },
    }),
    RulebasedConfiguratorRootModule,
    TextfieldConfiguratorRootModule,
  ],
};
