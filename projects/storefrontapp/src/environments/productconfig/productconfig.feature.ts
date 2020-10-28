import { translations } from '@spartacus/assets';
import { ConfigModule } from '@spartacus/core';
import { configuratorTranslations } from '@spartacus/product/configurators/common/assets';
import { RulebasedConfiguratorRootModule } from '@spartacus/product/configurators/rulebased/root';
//import { TextfieldConfiguratorModule } from '@spartacus/product/configurators/textfield';
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
    }),
    //RuleBasedConfiguratorModule,
    RulebasedConfiguratorRootModule,
    //VariantConfiguratorModule,
    //TextfieldConfiguratorModule,
  ],
};
