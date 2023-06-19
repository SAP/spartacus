/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TranslationChunksConfig, TranslationResources } from '@spartacus/core';
import { en } from './en/index';

export const quoteTranslations: TranslationResources = {
  en,
};

export const quoteTranslationChunksConfig: TranslationChunksConfig = {
  quote: ['quotes'],
};
