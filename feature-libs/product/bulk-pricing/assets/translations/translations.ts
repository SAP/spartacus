import { TranslationChunksConfig, TranslationResources } from '@spartacus/core';
import { en } from './en/index';

export const bulkPricingTranslations: TranslationResources = {
  en,
};

// expose all translation chunk mapping for bulkPricing feature
export const bulkPricingTranslationChunksConfig: TranslationChunksConfig = {
  bulkPricing: ['bulkPricingTable'],
};
