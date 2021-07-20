import { TranslationChunksConfig, TranslationResources } from '@spartacus/core';
import { en } from './en/index';

export const userAnonymousConsentsTranslations: TranslationResources = {
  en,
};

export const userAnonymousConsentsTranslationChunksConfig: TranslationChunksConfig = {
  userAnonymousConsents: ['preferences', 'dialog', 'banner'],
};
