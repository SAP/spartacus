import { TranslationChunksConfig, TranslationResources } from '@spartacus/core';
import { en } from './en/index';

export const savedCartTranslations: TranslationResources = {
  en,
};

// expose all translation chunk mapping for savedCart feature
export const savedCartTranslationChunksConfig: TranslationChunksConfig = {
  savedCart: [
    'savedCartDetails',
    'savedCartList',
    'savedCartCartPage',
    'savedCartDialog',
    'addToSavedCart',
  ],
};
