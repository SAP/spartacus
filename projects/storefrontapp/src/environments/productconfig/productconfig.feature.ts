import { translationChunksConfig, translations } from '@spartacus/assets';
import { CommonConfiguratorModule } from '@spartacus/product/configurators/common';
import {
  configuratorTranslationChunksConfig,
  configuratorTranslations,
} from '@spartacus/product/configurators/common/assets';
import { TextfieldConfiguratorModule } from '@spartacus/product/configurators/textfield';
import { VariantConfiguratorModule } from '@spartacus/product/configurators/variant';
import { FeatureEnvironment } from '../models/feature.model';
export const productConfigFeature: FeatureEnvironment = {
  imports: [
    { ngModule: TextfieldConfiguratorModule },
    CommonConfiguratorModule.withConfig({
      i18n: {
        resources: {
          en: { ...translations.en, ...configuratorTranslations.en },
        },
        chunks: {
          ...translationChunksConfig,
          ...configuratorTranslationChunksConfig,
        },

        fallbackLang: 'en',
      },
    }),
    { ngModule: VariantConfiguratorModule },
  ],
};
