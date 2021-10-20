import { TranslationChunksConfig, TranslationResources } from '@spartacus/core';
import { en } from './en/index';

export const productImageZoomTranslations: TranslationResources = {
  en,
};

// expose all translation chunk mapping for imageZoom feature
export const productImageZoomTranslationChunksConfig: TranslationChunksConfig =
  {
    productImageZoom: ['productImageZoomTrigger', 'productImageZoomDialog'],
  };
