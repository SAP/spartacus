/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  SEGMENT_FEATURE_NAME,
  SPARTACUS_SEGMENT,
  SPARTACUS_SEGMENT_ROOT,
} from '../../libs-constants';
import { SchematicConfig } from '../../utils/lib-utils';

export const SEGMENT_FOLDER_NAME = 'segment';
export const SEGMENT_MODULE_NAME = 'Segment';
export const SEGMENT_MODULE = 'SegmentModule';
export const SEGMENT_ROOT_MODULE = 'SegmentRootModule';

export const SEGMENT_SCHEMATICS_CONFIG: SchematicConfig = {
  library: {
    featureName: SEGMENT_FEATURE_NAME,
    mainScope: SPARTACUS_SEGMENT,
  },
  folderName: SEGMENT_FOLDER_NAME,
  moduleName: SEGMENT_MODULE_NAME,
  featureModule: {
    name: SEGMENT_MODULE,
    importPath: SPARTACUS_SEGMENT,
  },
  rootModule: {
    name: SEGMENT_ROOT_MODULE,
    importPath: SPARTACUS_SEGMENT_ROOT,
  },
  dependencyFeatures: [],
  importAfter: [],
};
