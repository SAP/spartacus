/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CART_BASE_FEATURE_NAME,
  CHECKOUT_B2B_FEATURE_NAME,
  ORDER_FEATURE_NAME,
  S4OM_FEATURE_NAME,
  SPARTACUS_S4OM,
  SPARTACUS_S4OM_ASSETS,
  SPARTACUS_S4OM_ROOT,
} from '../../libs-constants';
import { SchematicConfig } from '../../utils/lib-utils';

export const S4OM_FOLDER_NAME = 's4om';
export const S4OM_FEATURE_MODULE_NAME = 'S4om';

export const S4OM_TRANSLATIONS = 's4omTranslations';
export const S4OM_TRANSLATION_CHUNKS_CONFIG = 's4omTranslationChunksConfig';
export const S4OM_ROOT_MODULE = 'S4omRootModule';
export const S4OM_MODULE = 'S4omModule';

export const S4OM_SCHEMATICS_CONFIG: SchematicConfig = {
  library: {
    featureName: S4OM_FEATURE_NAME,
    mainScope: SPARTACUS_S4OM,
    b2b: true,
  },
  folderName: S4OM_FOLDER_NAME,
  moduleName: S4OM_FEATURE_MODULE_NAME,
  featureModule: {
    name: S4OM_MODULE,
    importPath: S4OM_MODULE,
  },
  rootModule: {
    name: S4OM_ROOT_MODULE,
    importPath: SPARTACUS_S4OM_ROOT,
  },
  i18n: {
    resources: S4OM_TRANSLATIONS,
    chunks: S4OM_TRANSLATION_CHUNKS_CONFIG,
    importPath: SPARTACUS_S4OM_ASSETS,
  },
  dependencyFeatures: [
    CHECKOUT_B2B_FEATURE_NAME,
    CART_BASE_FEATURE_NAME,
    ORDER_FEATURE_NAME,
  ],
};
