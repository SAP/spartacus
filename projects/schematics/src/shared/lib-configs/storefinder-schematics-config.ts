/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  SPARTACUS_STOREFINDER,
  SPARTACUS_STOREFINDER_ASSETS,
  SPARTACUS_STOREFINDER_ROOT,
  STOREFINDER_FEATURE_NAME,
} from '../libs-constants';
import { SchematicConfig } from '../utils/lib-utils';

export const STOREFINDER_FOLDER_NAME = 'storefinder';
export const STOREFINDER_MODULE_NAME = 'StoreFinder';
export const STOREFINDER_SCSS_FILE_NAME = 'storefinder.scss';

export const STOREFINDER_MODULE = 'StoreFinderModule';
export const STOREFINDER_ROOT_MODULE = 'StoreFinderRootModule';
export const STOREFINDER_FEATURE_NAME_CONSTANT = 'STORE_FINDER_FEATURE';
export const STOREFINDER_TRANSLATIONS = 'storeFinderTranslations';
export const STOREFINDER_TRANSLATION_CHUNKS_CONFIG =
  'storeFinderTranslationChunksConfig';

export const STOREFINDER_SCHEMATICS_CONFIG: SchematicConfig = {
  library: {
    featureName: STOREFINDER_FEATURE_NAME,
    mainScope: SPARTACUS_STOREFINDER,
  },
  folderName: STOREFINDER_FOLDER_NAME,
  moduleName: STOREFINDER_MODULE_NAME,
  featureModule: {
    name: STOREFINDER_MODULE,
    importPath: SPARTACUS_STOREFINDER,
  },
  rootModule: {
    name: STOREFINDER_ROOT_MODULE,
    importPath: SPARTACUS_STOREFINDER_ROOT,
  },
  lazyLoadingChunk: {
    moduleSpecifier: SPARTACUS_STOREFINDER_ROOT,
    namedImports: [STOREFINDER_FEATURE_NAME_CONSTANT],
  },
  i18n: {
    resources: STOREFINDER_TRANSLATIONS,
    chunks: STOREFINDER_TRANSLATION_CHUNKS_CONFIG,
    importPath: SPARTACUS_STOREFINDER_ASSETS,
  },
  styles: {
    scssFileName: STOREFINDER_SCSS_FILE_NAME,
    importStyle: SPARTACUS_STOREFINDER,
  },
};
