/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  OPPS_COUPON_CODES_FEATURE_NAME,
  SPARTACUS_OPPS,
  SPARTACUS_OPPS_COUPON_CODES,
  TRACKING_PERSONALIZATION_FEATURE_NAME,
} from '../../libs-constants';
import { SchematicConfig } from '../../utils/lib-utils';

export const OPPS_FOLDER_NAME = 'opps';
export const OPPS_MODULE_NAME = 'Opps';
export const OPPS_COUPON_CODES_MODULE = 'OppsCouponCodesModule';
export const OPPS_FEATURE_NAME_CONSTANT = 'OPPS_FEATURE';

export const OPPS_COUPON_CODES_SCHEMATICS_CONFIG: SchematicConfig = {
  library: {
    featureName: OPPS_COUPON_CODES_FEATURE_NAME,
    mainScope: SPARTACUS_OPPS,
  },
  folderName: OPPS_FOLDER_NAME,
  moduleName: OPPS_MODULE_NAME,
  featureModule: {
    name: OPPS_COUPON_CODES_MODULE,
    importPath: SPARTACUS_OPPS_COUPON_CODES,
  },
  rootModule: {
    importPath: SPARTACUS_OPPS_COUPON_CODES,
    name: OPPS_COUPON_CODES_MODULE,
    content: `${OPPS_COUPON_CODES_MODULE}`,
  },
  /* Through Spartacus Opps code doesnot have a dependency on Personalization,
  backend occ api of Opps requires Personalization to be enabled , hence adding this dependency
  If Personalization library is not installed, Personalization & Opps won't apply */
  dependencyFeatures: [TRACKING_PERSONALIZATION_FEATURE_NAME],
};
