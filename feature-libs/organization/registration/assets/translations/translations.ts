import { TranslationChunksConfig, TranslationResources } from '@spartacus/core';
import { en } from './en/index';

export const registrationTranslations: TranslationResources = {
  en,
};

// expose all translation chunk mapping for B2B registration feature
export const registrationChunksConfig: TranslationChunksConfig = {
  registration: ['registrationForm'],
};
