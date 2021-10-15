import { TranslationChunksConfig, TranslationResources } from '@spartacus/core';
import { en } from './en/index';

export const cartTranslations: TranslationResources = {
  en,
};

export const cartTranslationChunksConfig: TranslationChunksConfig = {
  cart: [
    'cartDetails',
    'cartItems',
    'orderCost',
    'voucher',
    'wishlist',
    'saveForLaterItems',
  ],
};
