import { TranslationChunksConfig, TranslationResources } from '@spartacus/core';
import { en } from './en/index';

export const cartValidationTranslations: TranslationResources = {
  en,
};

// expose translation chunks mapping for cart validation feature
export const cartValidationTranslationChunksConfig: TranslationChunksConfig = {
  cartValidation: ['cartValidationErrors'],
};
