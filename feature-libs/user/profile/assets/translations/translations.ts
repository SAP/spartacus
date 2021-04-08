import { TranslationChunksConfig, TranslationResources } from '@spartacus/core';
import { en } from './en/index';

export const userProfileTranslations: TranslationResources = {
  en,
};

export const userProfileTranslationChunksConfig: TranslationChunksConfig = {
  userProfile: ['updateEmailForm', 'register', 'forgottenPassword'],
};
