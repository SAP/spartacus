import { translationChunksConfig, translations } from '@spartacus/assets';
import { CommonConfiguratorModule } from '@spartacus/product/configurators/common';
import { TextfieldConfiguratorModule } from '@spartacus/product/configurators/textfield';
import { VariantConfiguratorModule } from '@spartacus/product/configurators/variant';
import {
  configuratorTranslationChunksConfig,
  configuratorTranslations,
} from 'feature-libs/product/configurators/common/assets/public_api';
import { FeatureEnvironment } from '../models/feature.model';
export const productConfigFeature: FeatureEnvironment = {
  imports: [
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
    { ngModule: TextfieldConfiguratorModule },
  ],
};
