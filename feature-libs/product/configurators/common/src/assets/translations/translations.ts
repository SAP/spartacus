import { TranslationChunksConfig } from '@spartacus/assets';
import { TranslationResources } from '@spartacus/core';
import { en } from './en/index';

export const configuratorTranslations: TranslationResources = {
  en,
};

// expose all translation chunk mapping for configurator sub features
export const configurationTranslationChunksConfig: TranslationChunksConfig = {
  configurator: [
    'configurator.header',
    'configurator.tabBar',
    'configurator.attribute',
    'configurator.button',
    'configurator.priceSummary',
    'configurator.addToCart',
    'configurator.overviewForm',
    'configurator.group',
    'configurator.conflict',
  ],
};
