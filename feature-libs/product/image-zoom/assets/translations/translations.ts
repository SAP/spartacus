import { TranslationChunksConfig, TranslationResources } from '@spartacus/core';
import { en } from './en/index';

export const imageZoomTranslations: TranslationResources = {
  en,
};

// expose all translation chunk mapping for imageZoom feature
export const imageZoomTranslationChunksConfig: TranslationChunksConfig = {
  imageZoom: ['imageZoomTrigger'],
};
