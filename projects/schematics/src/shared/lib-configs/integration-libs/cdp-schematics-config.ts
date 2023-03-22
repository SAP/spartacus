/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CDP_FEATURE_NAME,
  SPARTACUS_CDP,
  SPARTACUS_CDP_USER_PROFILE,
  USER_PROFILE_FEATURE_NAME,
} from '../../libs-constants';
import { SchematicConfig } from '../../utils/lib-utils';
import { USER_PROFILE_MODULE } from '../user-schematics-config';
export const CDP_FOLDER_NAME = 'cdp';
export const CDP_MODULE_NAME = 'Cdp';
export const CDP_MODULE = 'CdpModule';
export const CDP_USER_PROFILE_MODULE = 'CDPUserProfileModule';

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
    {
      name: CDP_USER_PROFILE_MODULE,
      importPath: SPARTACUS_CDP_USER_PROFILE,
    },
  ],
  dependencyFeatures: [USER_PROFILE_FEATURE_NAME],
  importAfter: [
    {
      markerModuleName: USER_PROFILE_MODULE,
      featureModuleName: CDP_USER_PROFILE_MODULE,
    },
  ],
};
