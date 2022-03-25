import { TranslationChunksConfig, TranslationResources } from '@spartacus/core';
import { en } from './en/index';

export const productVariantsTranslations: TranslationResources = {
  en,
};

// expose all translation chunk mapping for variants sub features
export const productVariantsTranslationChunksConfig: TranslationChunksConfig = {
  productVariants: ['productVariants'],
};
