/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TranslationChunksConfig, TranslationResources } from '@commerce-storefront-toolset/core';
import { en } from './en/index';

export const asmTranslations: TranslationResources = {
  en,
};

export const asmTranslationChunksConfig: TranslationChunksConfig = {
  asm: ['asm'],
};
