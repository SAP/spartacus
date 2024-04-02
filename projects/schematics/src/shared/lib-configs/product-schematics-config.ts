/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  PRODUCT_BULK_PRICING_FEATURE_NAME,
  PRODUCT_FUTURE_STOCK_FEATURE_NAME,
  PRODUCT_IMAGE_ZOOM_FEATURE_NAME,
  PRODUCT_VARIANTS_FEATURE_NAME,
  SPARTACUS_BULK_PRICING,
  SPARTACUS_BULK_PRICING_ASSETS,
  SPARTACUS_BULK_PRICING_ROOT,
  SPARTACUS_FUTURE_STOCK,
  SPARTACUS_FUTURE_STOCK_ASSETS,
  SPARTACUS_FUTURE_STOCK_ROOT,
  SPARTACUS_IMAGE_ZOOM,
  SPARTACUS_IMAGE_ZOOM_ASSETS,
  SPARTACUS_IMAGE_ZOOM_ROOT,
  SPARTACUS_PRODUCT,
  SPARTACUS_VARIANTS,
  SPARTACUS_VARIANTS_ASSETS,
  SPARTACUS_VARIANTS_ROOT,
} from '../libs-constants';
import { SchematicConfig } from '../utils/lib-utils';

export const PRODUCT_FOLDER_NAME = 'product';
export const PRODUCT_SCSS_FILE_NAME = 'product.scss';

export const BULK_PRICING_MODULE = 'BulkPricingModule';
export const BULK_PRICING_ROOT_MODULE = 'BulkPricingRootModule';
export const BULK_PRICING_MODULE_NAME = 'ProductBulkPricing';
export const BULK_PRICING_FEATURE_NAME_CONSTANT =
  'PRODUCT_BULK_PRICING_FEATURE';
export const BULK_PRICING_TRANSLATIONS = 'bulkPricingTranslations';
export const BULK_PRICING_TRANSLATION_CHUNKS_CONFIG =
  'bulkPricingTranslationChunksConfig';

export const PRODUCT_BULK_PRICING_SCHEMATICS_CONFIG: SchematicConfig = {
  library: {
    featureName: PRODUCT_BULK_PRICING_FEATURE_NAME,
    mainScope: SPARTACUS_PRODUCT,
    featureScope: SPARTACUS_BULK_PRICING,
    b2b: true,
  },
  folderName: PRODUCT_FOLDER_NAME,
  moduleName: BULK_PRICING_MODULE_NAME,
  featureModule: {
    name: BULK_PRICING_MODULE,
    importPath: SPARTACUS_BULK_PRICING,
  },
  rootModule: {
    name: BULK_PRICING_ROOT_MODULE,
    importPath: SPARTACUS_BULK_PRICING_ROOT,
  },
  lazyLoadingChunk: {
    moduleSpecifier: SPARTACUS_BULK_PRICING_ROOT,
    namedImports: [BULK_PRICING_FEATURE_NAME_CONSTANT],
  },
  i18n: {
    resources: BULK_PRICING_TRANSLATIONS,
    chunks: BULK_PRICING_TRANSLATION_CHUNKS_CONFIG,
    importPath: SPARTACUS_BULK_PRICING_ASSETS,
  },
  styles: {
    scssFileName: PRODUCT_SCSS_FILE_NAME,
    importStyle: SPARTACUS_PRODUCT,
  },
};

export const IMAGE_ZOOM_MODULE = 'ProductImageZoomModule';
export const IMAGE_ZOOM_ROOT_MODULE = 'ProductImageZoomRootModule';
export const IMAGE_ZOOM_MODULE_NAME = 'ProductImageZoom';
export const IMAGE_ZOOM_FEATURE_NAME_CONSTANT = 'PRODUCT_IMAGE_ZOOM_FEATURE';
export const IMAGE_ZOOM_TRANSLATIONS = 'productImageZoomTranslations';
export const IMAGE_ZOOM_TRANSLATION_CHUNKS_CONFIG =
  'productImageZoomTranslationChunksConfig';

export const PRODUCT_IMAGE_ZOOM_SCHEMATICS_CONFIG: SchematicConfig = {
  library: {
    featureName: PRODUCT_IMAGE_ZOOM_FEATURE_NAME,
    mainScope: SPARTACUS_PRODUCT,
    featureScope: SPARTACUS_IMAGE_ZOOM,
  },
  folderName: PRODUCT_FOLDER_NAME,
  moduleName: IMAGE_ZOOM_MODULE_NAME,
  featureModule: {
    name: IMAGE_ZOOM_MODULE,
    importPath: SPARTACUS_IMAGE_ZOOM,
  },
  rootModule: {
    name: IMAGE_ZOOM_ROOT_MODULE,
    importPath: SPARTACUS_IMAGE_ZOOM_ROOT,
  },
  lazyLoadingChunk: {
    moduleSpecifier: SPARTACUS_IMAGE_ZOOM_ROOT,
    namedImports: [IMAGE_ZOOM_FEATURE_NAME_CONSTANT],
  },
  i18n: {
    resources: IMAGE_ZOOM_TRANSLATIONS,
    chunks: IMAGE_ZOOM_TRANSLATION_CHUNKS_CONFIG,
    importPath: SPARTACUS_IMAGE_ZOOM_ASSETS,
  },
  styles: {
    scssFileName: PRODUCT_SCSS_FILE_NAME,
    importStyle: SPARTACUS_PRODUCT,
  },
};

export const VARIANTS_MODULE = 'ProductVariantsModule';
export const VARIANTS_ROOT_MODULE = 'ProductVariantsRootModule';
export const VARIANTS_MODULE_NAME = 'ProductVariants';
export const VARIANTS_FEATURE_NAME_CONSTANT = 'PRODUCT_VARIANTS_FEATURE';
export const VARIANTS_TRANSLATIONS = 'productVariantsTranslations';
export const VARIANTS_TRANSLATION_CHUNKS_CONFIG =
  'productVariantsTranslationChunksConfig';

export const PRODUCT_VARIANTS_SCHEMATICS_CONFIG: SchematicConfig = {
  library: {
    featureName: PRODUCT_VARIANTS_FEATURE_NAME,
    mainScope: SPARTACUS_PRODUCT,
    featureScope: SPARTACUS_VARIANTS,
  },
  folderName: PRODUCT_FOLDER_NAME,
  moduleName: VARIANTS_MODULE_NAME,
  featureModule: {
    name: VARIANTS_MODULE,
    importPath: SPARTACUS_VARIANTS,
  },
  rootModule: {
    name: VARIANTS_ROOT_MODULE,
    importPath: SPARTACUS_VARIANTS_ROOT,
  },
  lazyLoadingChunk: {
    moduleSpecifier: SPARTACUS_VARIANTS_ROOT,
    namedImports: [VARIANTS_FEATURE_NAME_CONSTANT],
  },
  i18n: {
    resources: VARIANTS_TRANSLATIONS,
    chunks: VARIANTS_TRANSLATION_CHUNKS_CONFIG,
    importPath: SPARTACUS_VARIANTS_ASSETS,
  },
  styles: {
    scssFileName: PRODUCT_SCSS_FILE_NAME,
    importStyle: SPARTACUS_PRODUCT,
  },
};

export const FUTURE_STOCK_MODULE = 'FutureStockModule';
export const FUTURE_STOCK_ROOT_MODULE = 'FutureStockRootModule';
export const FUTURE_STOCK_MODULE_NAME = 'ProductFutureStock';
export const FUTURE_STOCK_FEATURE_NAME_CONSTANT =
  'PRODUCT_FUTURE_STOCK_FEATURE';
export const FUTURE_STOCK_TRANSLATIONS = 'futureStockTranslations';
export const FUTURE_STOCK_TRANSLATION_CHUNKS_CONFIG =
  'futureStockTranslationChunksConfig';

export const PRODUCT_FUTURE_STOCK_SCHEMATICS_CONFIG: SchematicConfig = {
  library: {
    featureName: PRODUCT_FUTURE_STOCK_FEATURE_NAME,
    mainScope: SPARTACUS_PRODUCT,
    featureScope: SPARTACUS_FUTURE_STOCK,
    b2b: true,
  },
  folderName: PRODUCT_FOLDER_NAME,
  moduleName: FUTURE_STOCK_MODULE_NAME,
  featureModule: {
    name: FUTURE_STOCK_MODULE,
    importPath: SPARTACUS_FUTURE_STOCK,
  },
  rootModule: {
    name: FUTURE_STOCK_ROOT_MODULE,
    importPath: SPARTACUS_FUTURE_STOCK_ROOT,
  },
  lazyLoadingChunk: {
    moduleSpecifier: SPARTACUS_FUTURE_STOCK_ROOT,
    namedImports: [FUTURE_STOCK_FEATURE_NAME_CONSTANT],
  },
  i18n: {
    resources: FUTURE_STOCK_TRANSLATIONS,
    chunks: FUTURE_STOCK_TRANSLATION_CHUNKS_CONFIG,
    importPath: SPARTACUS_FUTURE_STOCK_ASSETS,
  },
  styles: {
    scssFileName: PRODUCT_SCSS_FILE_NAME,
    importStyle: SPARTACUS_PRODUCT,
  },
};
