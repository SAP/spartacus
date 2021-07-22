import { TranslationChunksConfig, TranslationResources } from '@spartacus/core';
import { en } from './en/index';

export const orderTranslations: TranslationResources = {
  en,
};

export const orderTranslationChunksConfig: TranslationChunksConfig = {
  order: [
    'orderDetails',
    'orderHistory',
    'AccountOrderHistoryTabContainer',
    'returnRequestList',
    'returnRequest',
  ],
};
