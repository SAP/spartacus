import { TranslationChunksConfig, TranslationResources } from '@spartacus/core';
import { en } from './en/index';

export const unitOrderTranslations: TranslationResources = {
  en,
};

// expose all translation chunk mapping for orderApproval feature
export const unitOrderTranslationChunksConfig: TranslationChunksConfig = {
  unitOrder: ['unitLevelOrderHistory'],
};
