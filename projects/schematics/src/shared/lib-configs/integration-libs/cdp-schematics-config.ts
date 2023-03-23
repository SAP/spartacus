/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  // CART_BASE_FEATURE_NAME,
  // ORDER_FEATURE_NAME,
  CDP_FEATURE_NAME,
  SPARTACUS_CDP,
  SPARTACUS_CDP_ROOT,
} from '../../libs-constants';
import { SchematicConfig } from '../../utils/lib-utils';

export const CDP_FOLDER_NAME = 'cdp';
export const CDP_FEATURE_MODULE_NAME = 'cdp';

export const CDP_FEATURE_NAME_CONSTANT = 'CDP_FEATURE';
export const CDP_TRANSLATIONS = 'cdpTranslations';
export const CDP_TRANSLATION_CHUNKS_CONFIG = 'cdpTranslationChunksConfig';
export const CDP_ROOT_MODULE = 'cdpRootModule';
export const CDP_MODULE = 'cdpModule';

export const CDP_SCHEMATICS_CONFIG: SchematicConfig = {
  library: {
    featureName: CDP_FEATURE_NAME,
    mainScope: SPARTACUS_CDP,
    b2b: true,
  },
  folderName: CDP_FOLDER_NAME,
  moduleName: CDP_FEATURE_MODULE_NAME,
  featureModule: {
    name: CDP_MODULE,
    importPath: SPARTACUS_CDP,
  },
  rootModule: {
    name: CDP_ROOT_MODULE,
    importPath: SPARTACUS_CDP_ROOT,
  },
  lazyLoadingChunk: {
    moduleSpecifier: SPARTACUS_CDP_ROOT,
    namedImports: [CDP_FEATURE_NAME_CONSTANT],
  },
  // i18n: {
  //   resources: CDP_TRANSLATIONS,
  //   chunks: CDP_TRANSLATION_CHUNKS_CONFIG,
  //   importPath: SPARTACUS_CDP_ASSETS,
  // },
  // dependencyFeatures: [CART_BASE_FEATURE_NAME, ORDER_FEATURE_NAME],
};
