/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CDP_FEATURE_NAME, SPARTACUS_CDP } from '../../libs-constants';
import { SchematicConfig } from '../../utils/lib-utils';
export const CDP_FOLDER_NAME = 'cdp';
export const CDP_MODULE_NAME = 'Cdp';
export const CDP_MODULE = 'CdpModule';

export const CDP_SCHEMATICS_CONFIG: SchematicConfig = {
  library: {
    featureName: CDP_FEATURE_NAME,
    mainScope: SPARTACUS_CDP,
  },
  folderName: CDP_FOLDER_NAME,
  moduleName: CDP_MODULE_NAME,
  featureModule: [
    {
      importPath: SPARTACUS_CDP,
      name: CDP_MODULE,
    },
  ],
};
