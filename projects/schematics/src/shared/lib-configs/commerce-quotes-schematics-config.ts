/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CART_BASE_FEATURE_NAME,
  COMMERCE_QUOTES_FEATURE_NAME,
  SPARTACUS_COMMERCE_QUOTES,
  SPARTACUS_COMMERCE_QUOTES_ASSETS,
  SPARTACUS_COMMERCE_QUOTES_ROOT,
} from '../libs-constants';
import { SchematicConfig } from '../utils';

export const COMMERCE_QUOTES_FOLDER_NAME = 'commerce-quotes';
export const COMMERCE_QUOTES_MODULE_NAME = 'CommerceQuotes';

export const COMMERCE_QUOTES_FEATURE_NAME_CONSTANT = 'COMMERCE_QUOTES_FEATURE';
export const COMMERCE_QUOTES_MODULE = 'CommerceQuotesModule';
export const COMMERCE_QUOTES_ROOT_MODULE = 'CommerceQuotesRootModule';
export const COMMERCE_QUOTES_TRANSLATIONS = 'commerceQuotesTranslations';
export const COMMERCE_QUOTES_TRANSLATION_CHUNKS_CONFIG =
  'commerceQuotesTranslationChunksConfig';
export const COMMERCE_QUOTES_SCSS_FILE_NAME = 'commerce-quotes.scss';

export const COMMERCE_QUOTES_SCHEMATICS_CONFIG: SchematicConfig = {
  library: {
    featureName: COMMERCE_QUOTES_FEATURE_NAME,
    mainScope: SPARTACUS_COMMERCE_QUOTES,
  },
  folderName: COMMERCE_QUOTES_FOLDER_NAME,
  moduleName: COMMERCE_QUOTES_MODULE_NAME,
  featureModule: {
    name: COMMERCE_QUOTES_MODULE,
    importPath: SPARTACUS_COMMERCE_QUOTES,
  },
  rootModule: {
    name: COMMERCE_QUOTES_ROOT_MODULE,
    importPath: SPARTACUS_COMMERCE_QUOTES_ROOT,
  },
  lazyLoadingChunk: {
    moduleSpecifier: SPARTACUS_COMMERCE_QUOTES_ROOT,
    namedImports: [COMMERCE_QUOTES_FEATURE_NAME_CONSTANT],
  },
  styles: {
    scssFileName: COMMERCE_QUOTES_SCSS_FILE_NAME,
    importStyle: SPARTACUS_COMMERCE_QUOTES,
  },
  i18n: {
    resources: COMMERCE_QUOTES_TRANSLATIONS,
    chunks: COMMERCE_QUOTES_TRANSLATION_CHUNKS_CONFIG,
    importPath: SPARTACUS_COMMERCE_QUOTES_ASSETS,
  },
  dependencyFeatures: [CART_BASE_FEATURE_NAME],
};
