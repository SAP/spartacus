/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ADD_TO_CART_ENTRY_POINT,
  ADD_TO_WISHLIST_ENTRY_POINT,
  CART_BASE_FEATURE_NAME,
  CART_IMPORT_EXPORT_FEATURE_NAME,
  CART_QUICK_ORDER_FEATURE_NAME,
  CART_SAVED_CART_FEATURE_NAME,
  CART_WISHLIST_FEATURE_NAME,
  MINI_CART_ENTRY_POINT,
  SPARTACUS_CART,
  SPARTACUS_CART_BASE,
  SPARTACUS_CART_BASE_ASSETS,
  SPARTACUS_CART_BASE_ROOT,
  SPARTACUS_CART_IMPORT_EXPORT,
  SPARTACUS_CART_IMPORT_EXPORT_ASSETS,
  SPARTACUS_CART_IMPORT_EXPORT_ROOT,
  SPARTACUS_CART_WISHLIST,
  SPARTACUS_CART_WISHLIST_ASSETS,
  SPARTACUS_CART_WISHLIST_ROOT,
  SPARTACUS_QUICK_ORDER,
  SPARTACUS_QUICK_ORDER_ASSETS,
  SPARTACUS_QUICK_ORDER_ROOT,
  SPARTACUS_SAVED_CART,
  SPARTACUS_SAVED_CART_ASSETS,
  SPARTACUS_SAVED_CART_ROOT,
  USER_PROFILE_FEATURE_NAME,
} from '../libs-constants';
import { SchematicConfig } from '../utils/lib-utils';

export const CART_FOLDER_NAME = 'cart';
export const CART_SCSS_FILE_NAME = 'cart.scss';

export const CART_BASE_MODULE = 'CartBaseModule';
export const CART_BASE_ROOT_MODULE = 'CartBaseRootModule';
export const MINI_CART_MODULE = 'MiniCartModule';
export const ADD_TO_CART_MODULE = 'AddToCartModule';
export const CART_BASE_FEATURE_MODULE_NAME = 'CartBase';
export const CART_BASE_FEATURE_NAME_CONSTANT = 'CART_BASE_FEATURE';
export const ADD_TO_CART_FEATURE_NAME_CONSTANT = 'ADD_TO_CART_FEATURE';
export const MINI_CART_FEATURE_NAME_CONSTANT = 'MINI_CART_FEATURE';
export const CART_BASE_TRANSLATIONS = 'cartBaseTranslations';
export const CART_BASE_TRANSLATION_CHUNKS_CONFIG =
  'cartBaseTranslationChunksConfig';

export const CART_BASE_SCHEMATICS_CONFIG: SchematicConfig = {
  library: {
    featureName: CART_BASE_FEATURE_NAME,
    mainScope: SPARTACUS_CART,
    featureScope: SPARTACUS_CART_BASE,
  },
  folderName: CART_FOLDER_NAME,
  moduleName: CART_BASE_FEATURE_MODULE_NAME,
  featureModule: [
    {
      name: CART_BASE_MODULE,
      importPath: SPARTACUS_CART_BASE,
    },
    {
      name: MINI_CART_MODULE,
      importPath: MINI_CART_ENTRY_POINT,
    },
    {
      name: ADD_TO_CART_MODULE,
      importPath: ADD_TO_CART_ENTRY_POINT,
    },
  ],
  rootModule: {
    name: CART_BASE_ROOT_MODULE,
    importPath: SPARTACUS_CART_BASE_ROOT,
  },
  lazyLoadingChunk: {
    moduleSpecifier: SPARTACUS_CART_BASE_ROOT,
    namedImports: [
      CART_BASE_FEATURE_NAME_CONSTANT,
      MINI_CART_FEATURE_NAME_CONSTANT,
      ADD_TO_CART_FEATURE_NAME_CONSTANT,
    ],
  },
  i18n: {
    resources: CART_BASE_TRANSLATIONS,
    chunks: CART_BASE_TRANSLATION_CHUNKS_CONFIG,
    importPath: SPARTACUS_CART_BASE_ASSETS,
  },
  styles: {
    scssFileName: CART_SCSS_FILE_NAME,
    importStyle: SPARTACUS_CART,
  },
  dependencyFeatures: [USER_PROFILE_FEATURE_NAME],
};

export const CART_IMPORT_EXPORT_MODULE = 'ImportExportModule';
export const CART_IMPORT_EXPORT_ROOT_MODULE = 'ImportExportRootModule';
export const CART_IMPORT_EXPORT_MODULE_NAME = 'CartImportExport';
export const CART_IMPORT_EXPORT_FEATURE_NAME_CONSTANT =
  'CART_IMPORT_EXPORT_FEATURE';
export const CART_IMPORT_EXPORT_TRANSLATIONS = 'importExportTranslations';
export const CART_IMPORT_EXPORT_TRANSLATION_CHUNKS_CONFIG =
  'importExportTranslationChunksConfig';

export const CART_IMPORT_EXPORT_SCHEMATICS_CONFIG: SchematicConfig = {
  library: {
    featureName: CART_IMPORT_EXPORT_FEATURE_NAME,
    mainScope: SPARTACUS_CART,
    featureScope: SPARTACUS_CART_IMPORT_EXPORT,
  },
  folderName: CART_FOLDER_NAME,
  moduleName: CART_IMPORT_EXPORT_MODULE_NAME,
  featureModule: {
    name: CART_IMPORT_EXPORT_MODULE,
    importPath: SPARTACUS_CART_IMPORT_EXPORT,
  },
  rootModule: {
    name: CART_IMPORT_EXPORT_ROOT_MODULE,
    importPath: SPARTACUS_CART_IMPORT_EXPORT_ROOT,
  },
  lazyLoadingChunk: {
    moduleSpecifier: SPARTACUS_CART_IMPORT_EXPORT_ROOT,
    namedImports: [CART_IMPORT_EXPORT_FEATURE_NAME_CONSTANT],
  },
  i18n: {
    resources: CART_IMPORT_EXPORT_TRANSLATIONS,
    chunks: CART_IMPORT_EXPORT_TRANSLATION_CHUNKS_CONFIG,
    importPath: SPARTACUS_CART_IMPORT_EXPORT_ASSETS,
  },
  styles: {
    scssFileName: CART_SCSS_FILE_NAME,
    importStyle: SPARTACUS_CART,
  },
};

export const QUICK_ORDER_MODULE = 'QuickOrderModule';
export const QUICK_ORDER_ROOT_MODULE = 'QuickOrderRootModule';
export const CART_QUICK_ORDER_MODULE_NAME = 'CartQuickOrder';
export const CART_QUICK_ORDER_FEATURE_NAME_CONSTANT =
  'CART_QUICK_ORDER_FEATURE';
export const QUICK_ORDER_TRANSLATIONS = 'quickOrderTranslations';
export const QUICK_ORDER_TRANSLATION_CHUNKS_CONFIG =
  'quickOrderTranslationChunksConfig';

export const CART_QUICK_ORDER_SCHEMATICS_CONFIG: SchematicConfig = {
  library: {
    featureName: CART_QUICK_ORDER_FEATURE_NAME,
    mainScope: SPARTACUS_CART,
    featureScope: SPARTACUS_QUICK_ORDER,
  },
  folderName: CART_FOLDER_NAME,
  moduleName: CART_QUICK_ORDER_MODULE_NAME,
  featureModule: {
    name: QUICK_ORDER_MODULE,
    importPath: SPARTACUS_QUICK_ORDER,
  },
  rootModule: {
    name: QUICK_ORDER_ROOT_MODULE,
    importPath: SPARTACUS_QUICK_ORDER_ROOT,
  },
  lazyLoadingChunk: {
    moduleSpecifier: SPARTACUS_QUICK_ORDER_ROOT,
    namedImports: [CART_QUICK_ORDER_FEATURE_NAME_CONSTANT],
  },
  i18n: {
    resources: QUICK_ORDER_TRANSLATIONS,
    chunks: QUICK_ORDER_TRANSLATION_CHUNKS_CONFIG,
    importPath: SPARTACUS_QUICK_ORDER_ASSETS,
  },
  styles: {
    scssFileName: CART_SCSS_FILE_NAME,
    importStyle: SPARTACUS_CART,
  },
  dependencyFeatures: [CART_BASE_FEATURE_NAME],
};

export const SAVED_CART_MODULE = 'SavedCartModule';
export const SAVED_CART_ROOT_MODULE = 'SavedCartRootModule';
export const CART_SAVED_CART_MODULE_NAME = 'CartSavedCart';
export const CART_SAVED_CART_FEATURE_NAME_CONSTANT = 'CART_SAVED_CART_FEATURE';
export const SAVED_CART_TRANSLATIONS = 'savedCartTranslations';
export const SAVED_CART_TRANSLATION_CHUNKS_CONFIG =
  'savedCartTranslationChunksConfig';

export const CART_SAVED_CART_SCHEMATICS_CONFIG: SchematicConfig = {
  library: {
    featureName: CART_SAVED_CART_FEATURE_NAME,
    mainScope: SPARTACUS_CART,
    featureScope: SPARTACUS_SAVED_CART,
  },
  folderName: CART_FOLDER_NAME,
  moduleName: CART_SAVED_CART_MODULE_NAME,
  featureModule: {
    name: SAVED_CART_MODULE,
    importPath: SPARTACUS_SAVED_CART,
  },
  rootModule: {
    name: SAVED_CART_ROOT_MODULE,
    importPath: SPARTACUS_SAVED_CART_ROOT,
  },
  lazyLoadingChunk: {
    moduleSpecifier: SPARTACUS_SAVED_CART_ROOT,
    namedImports: [CART_SAVED_CART_FEATURE_NAME_CONSTANT],
  },
  i18n: {
    resources: SAVED_CART_TRANSLATIONS,
    chunks: SAVED_CART_TRANSLATION_CHUNKS_CONFIG,
    importPath: SPARTACUS_SAVED_CART_ASSETS,
  },
  styles: {
    scssFileName: CART_SCSS_FILE_NAME,
    importStyle: SPARTACUS_CART,
  },
  dependencyFeatures: [CART_BASE_FEATURE_NAME],
};

export const CART_WISHLIST_FEATURE_MODULE_NAME = 'WishList';
export const CART_WISHLIST_MODULE = 'WishListModule';
export const ADD_TO_WISHLIST_MODULE = 'AddToWishListModule';
export const CART_WISHLIST_ROOT_MODULE = 'WishListRootModule';
export const CART_WISHLIST_FEATURE_NAME_CONSTANT = 'CART_WISH_LIST_FEATURE';
export const ADD_TO_WISHLIST_FEATURE_NAME_CONSTANT = 'ADD_TO_WISHLIST_FEATURE';
export const CART_WISHLIST_TRANSLATIONS = 'wishListTranslations';
export const CART_WISHLIST_TRANSLATION_CHUNKS_CONFIG =
  'wishListTranslationChunksConfig';

export const CART_WISHLIST_SCHEMATICS_CONFIG: SchematicConfig = {
  library: {
    featureName: CART_WISHLIST_FEATURE_NAME,
    mainScope: SPARTACUS_CART,
    featureScope: SPARTACUS_CART_WISHLIST,
  },
  folderName: CART_FOLDER_NAME,
  moduleName: CART_WISHLIST_FEATURE_MODULE_NAME,
  featureModule: [
    {
      name: CART_WISHLIST_MODULE,
      importPath: SPARTACUS_CART_WISHLIST,
    },
    {
      name: ADD_TO_WISHLIST_MODULE,
      importPath: ADD_TO_WISHLIST_ENTRY_POINT,
    },
  ],
  rootModule: {
    name: CART_WISHLIST_ROOT_MODULE,
    importPath: SPARTACUS_CART_WISHLIST_ROOT,
  },
  lazyLoadingChunk: {
    moduleSpecifier: SPARTACUS_CART_WISHLIST_ROOT,
    namedImports: [
      CART_WISHLIST_FEATURE_NAME_CONSTANT,
      ADD_TO_WISHLIST_FEATURE_NAME_CONSTANT,
    ],
  },
  i18n: {
    resources: CART_WISHLIST_TRANSLATIONS,
    chunks: CART_WISHLIST_TRANSLATION_CHUNKS_CONFIG,
    importPath: SPARTACUS_CART_WISHLIST_ASSETS,
  },
  styles: {
    scssFileName: CART_SCSS_FILE_NAME,
    importStyle: SPARTACUS_CART,
  },
  dependencyFeatures: [CART_BASE_FEATURE_NAME],
};
