/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  SPARTACUS_USER,
  SPARTACUS_USER_ACCOUNT,
  SPARTACUS_USER_ACCOUNT_ASSETS,
  SPARTACUS_USER_ACCOUNT_ROOT,
  SPARTACUS_USER_PROFILE,
  SPARTACUS_USER_PROFILE_ASSETS,
  SPARTACUS_USER_PROFILE_ROOT,
  USER_ACCOUNT_FEATURE_NAME,
  USER_PROFILE_FEATURE_NAME,
} from '../libs-constants';
import { SchematicConfig } from '../utils/lib-utils';

export const USER_FOLDER_NAME = 'user';
export const USER_SCSS_FILE_NAME = 'user.scss';
export const USER_FEATURE_MODULE_NAME = 'User';

export const USER_ACCOUNT_FEATURE_NAME_CONSTANT = 'USER_ACCOUNT_FEATURE';
export const USER_ACCOUNT_MODULE = 'UserAccountModule';
export const USER_ACCOUNT_ROOT_MODULE = 'UserAccountRootModule';
export const USER_ACCOUNT_TRANSLATIONS = 'userAccountTranslations';
export const USER_ACCOUNT_TRANSLATION_CHUNKS_CONFIG =
  'userAccountTranslationChunksConfig';

export const USER_ACCOUNT_SCHEMATICS_CONFIG: SchematicConfig = {
  library: {
    featureName: USER_ACCOUNT_FEATURE_NAME,
    mainScope: SPARTACUS_USER,
    featureScope: SPARTACUS_USER_ACCOUNT,
  },
  folderName: USER_FOLDER_NAME,
  moduleName: USER_FEATURE_MODULE_NAME,
  featureModule: {
    name: USER_ACCOUNT_MODULE,
    importPath: SPARTACUS_USER_ACCOUNT,
  },
  rootModule: {
    name: USER_ACCOUNT_ROOT_MODULE,
    importPath: SPARTACUS_USER_ACCOUNT_ROOT,
  },
  lazyLoadingChunk: {
    moduleSpecifier: SPARTACUS_USER_ACCOUNT_ROOT,
    namedImports: [USER_ACCOUNT_FEATURE_NAME_CONSTANT],
  },
  i18n: {
    resources: USER_ACCOUNT_TRANSLATIONS,
    chunks: USER_ACCOUNT_TRANSLATION_CHUNKS_CONFIG,
    importPath: SPARTACUS_USER_ACCOUNT_ASSETS,
  },
  styles: {
    scssFileName: USER_SCSS_FILE_NAME,
    importStyle: SPARTACUS_USER,
  },
};

export const USER_PROFILE_FEATURE_NAME_CONSTANT = 'USER_PROFILE_FEATURE';
export const USER_PROFILE_MODULE = 'UserProfileModule';
export const USER_PROFILE_ROOT_MODULE = 'UserProfileRootModule';
export const USER_PROFILE_TRANSLATIONS = 'userProfileTranslations';
export const USER_PROFILE_TRANSLATION_CHUNKS_CONFIG =
  'userProfileTranslationChunksConfig';

export const USER_PROFILE_SCHEMATICS_CONFIG: SchematicConfig = {
  library: {
    featureName: USER_PROFILE_FEATURE_NAME,
    mainScope: SPARTACUS_USER,
    featureScope: SPARTACUS_USER_PROFILE,
  },
  folderName: USER_FOLDER_NAME,
  moduleName: USER_FEATURE_MODULE_NAME,
  featureModule: {
    name: USER_PROFILE_MODULE,
    importPath: SPARTACUS_USER_PROFILE,
  },
  rootModule: {
    name: USER_PROFILE_ROOT_MODULE,
    importPath: SPARTACUS_USER_PROFILE_ROOT,
  },
  lazyLoadingChunk: {
    moduleSpecifier: SPARTACUS_USER_PROFILE_ROOT,
    namedImports: [USER_PROFILE_FEATURE_NAME_CONSTANT],
  },
  i18n: {
    resources: USER_PROFILE_TRANSLATIONS,
    chunks: USER_PROFILE_TRANSLATION_CHUNKS_CONFIG,
    importPath: SPARTACUS_USER_PROFILE_ASSETS,
  },
  styles: {
    scssFileName: USER_SCSS_FILE_NAME,
    importStyle: SPARTACUS_USER,
  },
  dependencyFeatures: [USER_ACCOUNT_FEATURE_NAME],
};
