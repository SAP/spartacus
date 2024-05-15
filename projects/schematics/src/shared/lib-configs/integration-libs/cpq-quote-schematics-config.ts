/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CPQ_QUOTE_FEATURE_NAME,
  SPARTACUS_CPQ_QUOTE,
  SPARTACUS_CPQ_QUOTE_ASSETS,
  SPARTACUS_CPQ_QUOTE_ROOT,
} from '../../libs-constants';
import { SchematicConfig } from '../../utils/lib-utils';

export const CPQ_QUOTE_FOLDER_NAME = 'cpq-quote';
export const CPQ_QUOTE_FEATURE_MODULE_NAME = 'Cpq-quote';

export const CPQ_QUOTE_FEATURE_NAME_CONSTANT = 'CPQ_QUOTE_FEATURE_NAME';
export const CPQ_QUOTE_ROOT_MODULE = 'CpqQuoteRootdModule';
export const CPQ_QUOTE_MODULE = 'CpqQuoteDiscountModule';
export const CPQ_QUOTE_TRANSLATIONS = 'cpqquoteTranslations';
export const CPQ_QUOTE_TRANSLATION_CHUNKS_CONFIG =
  'cpqquoteTranslationChunksConfig';

export const CPQ_QUOTE_SCHEMATICS_CONFIG: SchematicConfig = {
  library: {
    featureName: CPQ_QUOTE_FEATURE_NAME,
    mainScope: SPARTACUS_CPQ_QUOTE,
    b2b: true,
  },
  folderName: CPQ_QUOTE_FOLDER_NAME,
  moduleName: CPQ_QUOTE_FEATURE_MODULE_NAME,
  featureModule: {
    name: CPQ_QUOTE_MODULE,
    importPath: SPARTACUS_CPQ_QUOTE,
  },
  rootModule: {
    name: CPQ_QUOTE_ROOT_MODULE,
    importPath: SPARTACUS_CPQ_QUOTE_ROOT,
  },
  lazyLoadingChunk: {
    moduleSpecifier: SPARTACUS_CPQ_QUOTE_ROOT,
    namedImports: [CPQ_QUOTE_FEATURE_NAME_CONSTANT],
  },
  i18n: {
    resources: CPQ_QUOTE_TRANSLATIONS,
    chunks: CPQ_QUOTE_TRANSLATION_CHUNKS_CONFIG,
    importPath: SPARTACUS_CPQ_QUOTE_ASSETS,
  },
};
