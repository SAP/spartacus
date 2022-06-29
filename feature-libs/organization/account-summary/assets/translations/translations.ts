import { TranslationChunksConfig, TranslationResources } from '@spartacus/core';
import { en } from './en';

export const accountSummaryTranslations: TranslationResources = {
  en,
};

// expose all translation chunk mapping for organization sub features
export const accountSummaryTranslationChunksConfig: TranslationChunksConfig = {
  organization: [
    'orgUnit',
    'orgAccountSummary',
  ],
};
