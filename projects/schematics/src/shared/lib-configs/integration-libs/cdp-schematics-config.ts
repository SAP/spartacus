/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CDP_FEATURE_NAME,
  CUSTOMER_TICKETING_FEATURE_NAME,
  SPARTACUS_CDP,
  SPARTACUS_CDP_CUSTOMER_TICKETING,
} from '../../libs-constants';
import { SchematicConfig } from '../../utils/lib-utils';
import { CUSTOMER_TICKETING_MODULE } from '../customer-ticketing-schematics-config';

export const CDP_FOLDER_NAME = 'cdp';
export const CDP_MODULE_NAME = 'Cdp';
export const CDP_FEATURE_NAME_CONSTANT = 'CDP_FEATURE';
export const CDP_CUSTOMER_TICKETING_MODULE = 'CdpCustomerTicketingModule';

export const CDP_SCHEMATICS_CONFIG: SchematicConfig = {
  library: {
    featureName: CDP_FEATURE_NAME,
    mainScope: SPARTACUS_CDP,
  },
  folderName: CDP_FOLDER_NAME,
  moduleName: CDP_MODULE_NAME,
  featureModule: [
    {
      name: CDP_CUSTOMER_TICKETING_MODULE,
      importPath: SPARTACUS_CDP_CUSTOMER_TICKETING,
    },
  ],
  dependencyFeatures: [CUSTOMER_TICKETING_FEATURE_NAME],
  importAfter: [
    {
      markerModuleName: CUSTOMER_TICKETING_MODULE,
      featureModuleName: CDP_CUSTOMER_TICKETING_MODULE,
    },
  ],
};
