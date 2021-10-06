import { TranslationChunksConfig, TranslationResources } from '@spartacus/core';
import { en } from './en/index';

export const checkoutTranslations: TranslationResources = {
  en,
};

export const checkoutTranslationChunksConfig: TranslationChunksConfig = {
  checkout: [
    'checkout',
    'checkoutAddress',
    'checkoutOrderConfirmation',
    'checkoutReview',
    'checkoutShipping',
    'checkoutProgress',
    'checkoutPO',
  ],
};
