import { TranslationChunksConfig, TranslationResources } from '@spartacus/core';
import { en } from './en/index';

export const userAccountTranslations: TranslationResources = {
  en,
};

export const userAccountTranslationChunksConfig: TranslationChunksConfig = {
  userAccount: ['loginForm', 'miniLogin'],
};
