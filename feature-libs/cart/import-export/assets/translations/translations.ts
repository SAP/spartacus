/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TranslationChunksConfig, TranslationResources } from '@spartacus/core';
import { en } from './en/index';

export const importExportTranslations: TranslationResources = {
  en,
};

export const importExportTranslationChunksConfig: TranslationChunksConfig = {
  importExport: ['exportEntries', 'importEntries', 'importEntriesDialog'],
};
