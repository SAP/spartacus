import { TranslationChunksConfig, TranslationResources } from '@spartacus/core';
import { en } from './en/index';

export const variantsMultidimensionalTranslations: TranslationResources = {
  en,
};

// expose all translation chunk mapping for variantsMultidimensional feature
export const variantsMultidimensionalTranslationChunksConfig: TranslationChunksConfig = {
  variantsMultidimensional: ['orderGrid'],
};
