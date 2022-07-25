import { TranslationChunksConfig, TranslationResources } from '@spartacus/core';
import { en } from './en/index';

export const futureStockTranslations: TranslationResources = {
  en,
};

// expose all translation chunk mapping for FutureStock feature
export const futureStockTranslationChunksConfig: TranslationChunksConfig = {
  futureStock: ['futureStockDropdown'],
};
