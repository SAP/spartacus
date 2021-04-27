import { TranslationChunksConfig, TranslationResources } from '@spartacus/core';
import { en } from './en/index';
import { de } from './de/index';

export const importExportTranslations: TranslationResources = {
  en,
  de,
};

export const importExportTranslationChunksConfig: TranslationChunksConfig = {
  importExport: ['exportEntries'],
};
