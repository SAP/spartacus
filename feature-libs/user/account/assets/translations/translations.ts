import { TranslationChunksConfig, TranslationResources } from '@spartacus/core';
import { en } from './en/index';

export const userTranslations: TranslationResources = {
  en,
};

export const userTranslationChunksConfig: TranslationChunksConfig = {
  userAccount: ['loginForm', 'miniLogin'],
};
