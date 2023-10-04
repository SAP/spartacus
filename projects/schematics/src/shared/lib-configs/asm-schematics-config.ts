/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ASM_FEATURE_NAME,
  CUSTOMER_360_FEATURE_NAME,
  ORDER_FEATURE_NAME,
  SPARTACUS_ASM,
  SPARTACUS_ASM_ASSETS,
  SPARTACUS_ASM_ROOT,
  SPARTACUS_CUSTOMER_360,
  SPARTACUS_CUSTOMER_360_ASSETS,
  SPARTACUS_CUSTOMER_360_ROOT,
  STOREFINDER_FEATURE_NAME,
  USER_PROFILE_FEATURE_NAME,
} from '../libs-constants';
import { SchematicConfig } from '../utils/lib-utils';

export const ASM_FOLDER_NAME = 'asm';
export const ASM_FEATURE_MODULE_NAME = 'Asm';

export const ASM_FEATURE_NAME_CONSTANT = 'ASM_FEATURE';
export const ASM_MODULE = 'AsmModule';
export const ASM_ROOT_MODULE = 'AsmRootModule';
export const ASM_TRANSLATIONS = 'asmTranslations';
export const ASM_TRANSLATION_CHUNKS_CONFIG = 'asmTranslationChunksConfig';
export const ASM_SCSS_FILE_NAME = 'asm.scss';

export const ASM_SCHEMATICS_CONFIG: SchematicConfig = {
  library: {
    featureName: ASM_FEATURE_NAME,
    mainScope: SPARTACUS_ASM,
  },
  folderName: ASM_FOLDER_NAME,
  moduleName: ASM_FEATURE_MODULE_NAME,
  featureModule: {
    name: ASM_MODULE,
    importPath: SPARTACUS_ASM,
  },
  rootModule: {
    name: ASM_ROOT_MODULE,
    importPath: SPARTACUS_ASM_ROOT,
  },
  lazyLoadingChunk: {
    moduleSpecifier: SPARTACUS_ASM_ROOT,
    namedImports: [ASM_FEATURE_NAME_CONSTANT],
  },
  styles: {
    scssFileName: ASM_SCSS_FILE_NAME,
    importStyle: SPARTACUS_ASM,
  },
  i18n: {
    resources: ASM_TRANSLATIONS,
    chunks: ASM_TRANSLATION_CHUNKS_CONFIG,
    importPath: SPARTACUS_ASM_ASSETS,
  },
  dependencyFeatures: [USER_PROFILE_FEATURE_NAME],
};

export const CUSTOMER_360_MODULE = 'Customer360Module';
export const CUSTOMER_360_ROOT_MODULE = 'Customer360RootModule';
export const CUSTOMER_360_MODULE_NAME = 'Customer360';
export const CUSTOMER_360_FEATURE_NAME_CONSTANT = 'CUSTOMER_360_FEATURE';
export const CUSTOMER_360_TRANSLATIONS = 'customer360Translations';
export const CUSTOMER_360_TRANSLATION_CHUNKS_CONFIG =
  'customer360TranslationChunksConfig';

export const CUSTOMER_360_SCHEMATICS_CONFIG: SchematicConfig = {
  library: {
    featureName: CUSTOMER_360_FEATURE_NAME,
    mainScope: SPARTACUS_ASM,
    featureScope: SPARTACUS_CUSTOMER_360,
  },
  folderName: ASM_FOLDER_NAME,
  moduleName: CUSTOMER_360_MODULE_NAME,
  featureModule: {
    name: CUSTOMER_360_MODULE,
    importPath: SPARTACUS_CUSTOMER_360,
  },
  rootModule: {
    name: CUSTOMER_360_ROOT_MODULE,
    importPath: SPARTACUS_CUSTOMER_360_ROOT,
  },
  lazyLoadingChunk: {
    moduleSpecifier: SPARTACUS_CUSTOMER_360_ROOT,
    namedImports: [CUSTOMER_360_FEATURE_NAME_CONSTANT],
  },
  i18n: {
    resources: CUSTOMER_360_TRANSLATIONS,
    chunks: CUSTOMER_360_TRANSLATION_CHUNKS_CONFIG,
    importPath: SPARTACUS_CUSTOMER_360_ASSETS,
  },
  styles: {
    scssFileName: ASM_SCSS_FILE_NAME,
    importStyle: SPARTACUS_ASM,
  },
  dependencyFeatures: [
    ASM_FEATURE_NAME,
    STOREFINDER_FEATURE_NAME,
    ORDER_FEATURE_NAME,
  ],
};
