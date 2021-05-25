import { TranslationChunksConfig, TranslationResources } from '@spartacus/core';
import { en } from './en/index';

export const orderApprovalTranslations: TranslationResources = {
  en,
};

// expose all translation chunk mapping for orderApproval feature
export const orderApprovalTranslationChunksConfig: TranslationChunksConfig = {
  orderApproval: [
    'orderApprovalDetails',
    'orderApprovalList',
    'orderApprovalGlobal',
  ],
};
