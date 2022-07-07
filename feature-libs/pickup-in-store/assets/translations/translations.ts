import { TranslationChunksConfig, TranslationResources } from '@spartacus/core';
import { en } from './en/index';

export const pickupInStoreTranslations: TranslationResources = {
  en,
};

// expose all translation chunk mapping for the pickupInStore feature
export const pickupInStoreTranslationChunksConfig: TranslationChunksConfig = {
  pickupInStore: [
    'deliveryOptions',
    'pickupInStoreDialog',
    'store',
    'storeList',
    'storeSchedule',
    'storeSearch',
  ],
};
