import { TranslationChunksConfig, TranslationResources } from '@spartacus/core';
import { en } from './en/index';

export const commerceQuotesTranslations: TranslationResources = {
  en,
};

export const commerceQuotesTranslationChunksConfig: TranslationChunksConfig = {
  commerceQuotes: ['commerceQuotesList', 'commerceQuotesStates'],
};
