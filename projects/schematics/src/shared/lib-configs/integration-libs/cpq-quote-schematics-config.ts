/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CPQ_QUOTE_FEATURE_NAME,
  QUOTE_FEATURE_NAME,
  SPARTACUS_CPQ_QUOTE,
  SPARTACUS_CPQ_QUOTE_ASSETS,
  SPARTACUS_CPQ_QUOTE_ROOT,
  SPARTACUS_QUOTE,
  SPARTACUS_QUOTE_ASSETS,
  SPARTACUS_QUOTE_ROOT,
} from '../../libs-constants';
import { SchematicConfig } from '../../utils/lib-utils';
import { QUOTE_MODULE } from '../quote-schematics-config';

export const CPQ_QUOTE_FEATURE_NAME_CONSTANT = 'CPQ_QUOTE_FEATURE_NAME';
export const CPQ_QUOTE_FOLDER_NAME = 'cpq-quote';
export const CPQ_QUOTE_TRANSLATIONS = 'cpqquoteTranslations';
export const CPQ_QUOTE_TRANSLATION_CHUNKS_CONFIG =
  'cpqquoteTranslationChunksConfig';
export const CPQ_QUOTE_DISCOUNT_B_MODULE = 'CpqQuoteRootModule'; //root Blank Module
export const CPQ_QUOTE_MODULE = 'CpqQuoteModule'; //pushed wraper





export const CPQ_QUOTE_SCHEMATICS_CONFIG: SchematicConfig = {
  library: {
    featureName: CPQ_QUOTE_FEATURE_NAME,
    mainScope: SPARTACUS_CPQ_QUOTE,
  },
  folderName: CPQ_QUOTE_FOLDER_NAME,
  moduleName: CPQ_QUOTE_MODULE,
  featureModule: {
    name: CPQ_QUOTE_MODULE,
    importPath: SPARTACUS_CPQ_QUOTE,
  },
  rootModule: {
    name: CPQ_QUOTE_DISCOUNT_B_MODULE,
    importPath: SPARTACUS_CPQ_QUOTE_ROOT,
  },
  i18n: {
    resources: CPQ_QUOTE_TRANSLATIONS,
    chunks: CPQ_QUOTE_TRANSLATION_CHUNKS_CONFIG,
    importPath: SPARTACUS_CPQ_QUOTE_ASSETS,
  },
  dependencyFeatures: [
    SPARTACUS_QUOTE,
    SPARTACUS_QUOTE_ROOT,
    SPARTACUS_QUOTE_ASSETS,
    QUOTE_FEATURE_NAME,
  ],
  importAfter: [
    {
      markerModuleName: QUOTE_MODULE,
      featureModuleName: CPQ_QUOTE_MODULE,
    },
  ],
};
