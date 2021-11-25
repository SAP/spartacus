import { TranslationChunksConfig, TranslationResources } from '@spartacus/core';
import { en } from './en/index';

export const importExportTranslations: TranslationResources = {
  en,
};

export const importExportTranslationChunksConfig: TranslationChunksConfig = {
  importExport: ['exportEntries', 'importEntries', 'importEntriesDialog'],
};
