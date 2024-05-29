/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  OPPS_FEATURE_NAME,
  SPARTACUS_OPPS,
  SPARTACUS_OPPS_ROOT,
  TRACKING_PERSONALIZATION_FEATURE_NAME,
} from '../../libs-constants';
import { SchematicConfig } from '../../utils/lib-utils';

export const OPPS_FOLDER_NAME = 'opps';
export const OPPS_MODULE_NAME = 'Opps';
export const OPPS_ROOT_MODULE = 'OppsRootModule';

export const OPPS_SCHEMATICS_CONFIG: SchematicConfig = {
  library: {
    featureName: OPPS_FEATURE_NAME,
    mainScope: SPARTACUS_OPPS,
  },
  folderName: OPPS_FOLDER_NAME,
  moduleName: OPPS_MODULE_NAME,
  featureModule: {
    name: OPPS_ROOT_MODULE,
    importPath: SPARTACUS_OPPS,
  },
  rootModule: {
    importPath: SPARTACUS_OPPS_ROOT,
    name: OPPS_ROOT_MODULE,
    content: `${OPPS_ROOT_MODULE}`,
  },
  /* Through Spartacus OPPS code does not have a dependency on Personalization,
  backend occ api of OPPS requires Personalization to be enabled , hence adding this dependency */
  dependencyFeatures: [TRACKING_PERSONALIZATION_FEATURE_NAME],
};
