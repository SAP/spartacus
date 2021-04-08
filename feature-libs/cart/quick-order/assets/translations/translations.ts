import { TranslationChunksConfig, TranslationResources } from '@spartacus/core';
import { en } from './en/index';

export const quickOrderTranslations: TranslationResources = {
  en,
};

// expose all translation chunk mapping for quickOrder feature
export const quickOrderTranslationChunksConfig: TranslationChunksConfig = {
  quickOrder: ['quickOrderActions', 'quickOrderForm', 'quickOrderList'],
};
