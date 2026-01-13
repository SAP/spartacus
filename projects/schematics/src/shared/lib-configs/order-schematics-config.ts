/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CART_BASE_FEATURE_NAME,
  ORDER_DOCUMENT_FLOW_FEATURE_NAME,
  ORDER_FEATURE_NAME,
  SPARTACUS_ORDER,
  SPARTACUS_ORDER_ASSETS,
  SPARTACUS_ORDER_DOCUMENT_FLOW,
  SPARTACUS_ORDER_DOCUMENT_FLOW_ASSETS,
  SPARTACUS_ORDER_DOCUMENT_FLOW_ROOT,
  SPARTACUS_ORDER_ROOT,
} from '../libs-constants';
import { SchematicConfig } from '../utils/lib-utils';

export const ORDER_FOLDER_NAME = 'order';
export const ORDER_MODULE_NAME = 'Order';
export const ORDER_SCSS_FILE_NAME = 'order.scss';

export const ORDER_MODULE = 'OrderModule';
export const ORDER_ROOT_MODULE = 'OrderRootModule';
export const ORDER_FEATURE_NAME_CONSTANT = 'ORDER_FEATURE';
export const ORDER_TRANSLATIONS = 'orderTranslations';
export const ORDER_TRANSLATION_CHUNKS_CONFIG = 'orderTranslationChunksConfig';

export const ORDER_SCHEMATICS_CONFIG: SchematicConfig = {
  library: {
    featureName: ORDER_FEATURE_NAME,
    mainScope: SPARTACUS_ORDER,
  },
  folderName: ORDER_FOLDER_NAME,
  moduleName: ORDER_MODULE_NAME,
  featureModule: {
    name: ORDER_MODULE,
    importPath: SPARTACUS_ORDER,
  },
  rootModule: {
    name: ORDER_ROOT_MODULE,
    importPath: SPARTACUS_ORDER_ROOT,
  },
  lazyLoadingChunk: {
    moduleSpecifier: SPARTACUS_ORDER_ROOT,
    namedImports: [ORDER_FEATURE_NAME_CONSTANT],
  },
  i18n: {
    resources: ORDER_TRANSLATIONS,
    chunks: ORDER_TRANSLATION_CHUNKS_CONFIG,
    importPath: SPARTACUS_ORDER_ASSETS,
  },
  styles: {
    scssFileName: ORDER_SCSS_FILE_NAME,
    importStyle: SPARTACUS_ORDER,
  },
  dependencyFeatures: [CART_BASE_FEATURE_NAME],
};

export const ORDER_DOCUMENT_FLOW_MODULE = 'OrderDocumentFlowModule';
export const ORDER_DOCUMENT_FLOW_ROOT_MODULE = 'OrderDocumentFlowRootModule';
export const ORDER_DOCUMENT_FLOW_MODULE_NAME = 'OrderDocumentFlow';
export const ORDER_DOCUMENT_FLOW_FEATURE_NAME_CONSTANT =
  'ORDER_DOCUMENT_FLOW_FEATURE';
export const ORDER_DOCUMENT_FLOW_TRANSLATIONS = 'documentFlowTranslations';
export const ORDER_DOCUMENT_FLOW_TRANSLATION_CHUNKS_CONFIG =
  'orderDocumentFlowTranslationChunksConfig';

export const ORDER_DOCUMENT_FLOW_SCHEMATICS_CONFIG: SchematicConfig = {
  library: {
    featureName: ORDER_DOCUMENT_FLOW_FEATURE_NAME,
    mainScope: SPARTACUS_ORDER,
    featureScope: SPARTACUS_ORDER_DOCUMENT_FLOW,
  },
  folderName: ORDER_FOLDER_NAME,
  moduleName: ORDER_DOCUMENT_FLOW_MODULE_NAME,
  featureModule: {
    name: ORDER_DOCUMENT_FLOW_MODULE,
    importPath: SPARTACUS_ORDER_DOCUMENT_FLOW,
  },
  rootModule: {
    name: ORDER_DOCUMENT_FLOW_ROOT_MODULE,
    importPath: SPARTACUS_ORDER_DOCUMENT_FLOW_ROOT,
  },
  lazyLoadingChunk: {
    moduleSpecifier: SPARTACUS_ORDER_DOCUMENT_FLOW_ROOT,
    namedImports: [ORDER_DOCUMENT_FLOW_FEATURE_NAME_CONSTANT],
  },
  i18n: {
    resources: ORDER_DOCUMENT_FLOW_TRANSLATIONS,
    chunks: ORDER_DOCUMENT_FLOW_TRANSLATION_CHUNKS_CONFIG,
    importPath: SPARTACUS_ORDER_DOCUMENT_FLOW_ASSETS,
  },
  styles: {
    scssFileName: ORDER_SCSS_FILE_NAME,
    importStyle: SPARTACUS_ORDER,
  },
};
