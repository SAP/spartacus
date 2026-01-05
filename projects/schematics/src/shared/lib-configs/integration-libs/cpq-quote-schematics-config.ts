/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CART_BASE_FEATURE_NAME,
  CPQ_QUOTE_FEATURE_NAME,
  SPARTACUS_CPQ_QUOTE,
  SPARTACUS_CPQ_QUOTE_ASSETS,
  SPARTACUS_CPQ_QUOTE_ROOT,
} from '../../libs-constants';
import { SchematicConfig } from '../../utils/lib-utils';
import { CART_BASE_MODULE } from '../cart-schematics-config';

export const CPQ_QUOTE_FOLDER_NAME = 'cpq-quote';
export const CPQ_QUOTE_MODULE_NAME = 'CpqQuote';
export const CPQ_QUOTE_MODULE_ROOT = 'CpqQuoteRootModule';
export const CPQ_QUOTE_TRANSLATIONS = 'cpqquoteTranslations';
export const CPQ_QUOTE_TRANSLATION_CHUNKS_CONFIG =
  'cpqquoteTranslationChunksConfig';
export const CPQ_QUOTE_MODULE = 'CpqQuoteModule'; //pushed

export const CPQ_QUOTE_SCHEMATICS_CONFIG: SchematicConfig = {
  library: {
    featureName: CPQ_QUOTE_FEATURE_NAME,
    mainScope: SPARTACUS_CPQ_QUOTE,
  },
  folderName: CPQ_QUOTE_FOLDER_NAME,
  moduleName: CPQ_QUOTE_MODULE_NAME,
  featureModule: {
    name: CPQ_QUOTE_MODULE,
    importPath: SPARTACUS_CPQ_QUOTE,
  },
  rootModule: {
    name: CPQ_QUOTE_MODULE_ROOT,
    importPath: SPARTACUS_CPQ_QUOTE_ROOT,
  },
  i18n: {
    resources: CPQ_QUOTE_TRANSLATIONS,
    chunks: CPQ_QUOTE_TRANSLATION_CHUNKS_CONFIG,
    importPath: SPARTACUS_CPQ_QUOTE_ASSETS,
  },
  dependencyFeatures: [CART_BASE_FEATURE_NAME],
  importAfter: [
    {
      markerModuleName: CART_BASE_MODULE,
      featureModuleName: CPQ_QUOTE_MODULE,
    },
  ],
};
