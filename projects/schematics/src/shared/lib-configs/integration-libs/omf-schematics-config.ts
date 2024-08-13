/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  OMF_FEATURE_NAME,
  ORDER_FEATURE_NAME,
  SPARTACUS_OMF,
  SPARTACUS_OMF_ORDER,
  SPARTACUS_OMF_ROOT,
} from '../../libs-constants';
import { SchematicConfig } from '../../utils/lib-utils';
import { ORDER_MODULE } from '../order-schematics-config';

export const OMF_FOLDER_NAME = 'omf';
export const OMF_MODULE_NAME = 'Omf';
export const OMF_ROOT_MODULE = 'OmfRootModule';
export const OMF_ORDER_MODULE = 'OmfOrderModule';

export const OMF_SCHEMATICS_CONFIG: SchematicConfig = {
  library: {
    featureName: OMF_FEATURE_NAME,
    mainScope: SPARTACUS_OMF,
  },
  folderName: OMF_FOLDER_NAME,
  moduleName: OMF_MODULE_NAME,
  featureModule: [
    {
      name: OMF_ROOT_MODULE,
      importPath: SPARTACUS_OMF,
    },
    {
      name: OMF_ORDER_MODULE,
      importPath: SPARTACUS_OMF_ORDER,
    },
  ],
  rootModule: {
    importPath: SPARTACUS_OMF_ROOT,
    name: OMF_ROOT_MODULE,
    content: `${OMF_ROOT_MODULE}`,
  },
  dependencyFeatures: [ORDER_FEATURE_NAME],
  importAfter: [
    {
      markerModuleName: ORDER_MODULE,
      featureModuleName: OMF_ORDER_MODULE,
    },
  ],
};
