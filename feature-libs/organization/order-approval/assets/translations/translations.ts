/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

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
