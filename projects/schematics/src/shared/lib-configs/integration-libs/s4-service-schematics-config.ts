/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  S4_SERVICE_FEATURE_NAME,
  SPARTACUS_S4_SERVICE,
  SPARTACUS_S4_SERVICE_ROOT,
  SPARTACUS_S4_SERVICE_ASSETS,
  CHECKOUT_B2B_FEATURE_NAME,
  ORDER_FEATURE_NAME,
  SPARTACUS_S4_SERVICE_CHECKOUT,
  SPARTACUS_S4_SERVICE_ORDER,
} from '../../libs-constants';
import { SchematicConfig } from '../../utils';
import { CHECKOUT_B2B_MODULE } from '../checkout-schematics-config';
import { ORDER_MODULE } from '../order-schematics-config';

export const S4_SERVICE_FOLDER_NAME = 's4-service';
export const S4_SERVICE_MODULE_NAME = 'S4Service';
export const S4_SERVICE_SCSS_FILE_NAME = 's4-service.scss';

export const S4_SERVICE_MODULE = 'S4ServiceModule';
export const S4_SERVICE_CHECKOUT_MODULE = 'S4ServiceCheckoutModule';
export const S4_SERVICE_ORDER_MODULE = 'S4ServiceOrderModule';
export const S4_SERVICE_ROOT_MODULE = 'S4ServiceRootModule';
export const S4_SERVICE_FEATURE_NAME_CONSTANT = 'S4_SERVICE_FEATURE';
export const S4_SERVICE_TRANSLATIONS = 's4ServiceTranslations';
export const S4_SERVICE_TRANSLATION_CHUNKS_CONFIG =
  's4ServiceTranslationChunksConfig';

export const S4_SERVICE_SCHEMATICS_CONFIG: SchematicConfig = {
  library: {
    featureName: S4_SERVICE_FEATURE_NAME,
    mainScope: SPARTACUS_S4_SERVICE,
    b2b: true,
  },
  folderName: S4_SERVICE_FOLDER_NAME,
  moduleName: S4_SERVICE_MODULE_NAME,
  featureModule: [
    {
      name: S4_SERVICE_MODULE,
      importPath: SPARTACUS_S4_SERVICE,
    },
    {
      name: S4_SERVICE_CHECKOUT_MODULE,
      importPath: SPARTACUS_S4_SERVICE_CHECKOUT,
    },
    {
      name: S4_SERVICE_ORDER_MODULE,
      importPath: SPARTACUS_S4_SERVICE_ORDER,
    },
  ],
  rootModule: {
    name: S4_SERVICE_ROOT_MODULE,
    importPath: SPARTACUS_S4_SERVICE_ROOT,
  },
  lazyLoadingChunk: {
    moduleSpecifier: SPARTACUS_S4_SERVICE_ROOT,
    namedImports: [S4_SERVICE_FEATURE_NAME_CONSTANT],
  },
  i18n: {
    resources: S4_SERVICE_TRANSLATIONS,
    chunks: S4_SERVICE_TRANSLATION_CHUNKS_CONFIG,
    importPath: SPARTACUS_S4_SERVICE_ASSETS,
  },
  dependencyFeatures: [CHECKOUT_B2B_FEATURE_NAME, ORDER_FEATURE_NAME],
  styles: {
    scssFileName: S4_SERVICE_SCSS_FILE_NAME,
    importStyle: SPARTACUS_S4_SERVICE,
  },
  importAfter: [
    {
      markerModuleName: CHECKOUT_B2B_MODULE,
      featureModuleName: S4_SERVICE_CHECKOUT_MODULE,
    },
    {
      markerModuleName: ORDER_MODULE,
      featureModuleName: S4_SERVICE_ORDER_MODULE,
    },
  ],
};
