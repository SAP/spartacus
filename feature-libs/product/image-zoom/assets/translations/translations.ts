/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

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
