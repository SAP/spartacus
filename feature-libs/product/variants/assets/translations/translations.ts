import { TranslationChunksConfig, TranslationResources } from '@spartacus/core';
import { en } from './en/index';

export const organizationTranslations: TranslationResources = {
  en,
};

// expose all translation chunk mapping for variants sub features
export const variantsTranslationChunksConfig: TranslationChunksConfig = {
  variants: ['variants'],
};
