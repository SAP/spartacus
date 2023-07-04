/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  SEGMENT_REFS_FEATURE_NAME,
  SPARTACUS_SEGMENT_REFS,
  TRACKING_PERSONALIZATION_FEATURE_NAME,
} from '../../libs-constants';
import { SchematicConfig } from '../../utils/lib-utils';
import { PERSONALIZATION_MODULE } from '../tracking-schematics-config';

export const SEGMENT_REFS_FOLDER_NAME = 'segment-refs';
export const SEGMENT_REFS_MODULE_NAME = 'SegmentRefs';
export const SEGMENT_REFS_MODULE = 'SegmentRefsModule';
export const SEGMENT_REFS_ROOT_MODULE = 'SegmentRefsRootModule';
export const SEGMENT_REF_FEATURE_NAME_CONSTANT = 'SEGMENT_REFS_FEATURE';

export const SEGMENT_REFS_SCHEMATICS_CONFIG: SchematicConfig = {
  library: {
    featureName: SEGMENT_REFS_FEATURE_NAME,
    mainScope: SPARTACUS_SEGMENT_REFS,
  },
  folderName: SEGMENT_REFS_FOLDER_NAME,
  moduleName: SEGMENT_REFS_MODULE_NAME,
  featureModule: {
    name: SEGMENT_REFS_MODULE,
    importPath: SPARTACUS_SEGMENT_REFS,
  },
  dependencyFeatures: [TRACKING_PERSONALIZATION_FEATURE_NAME],
  importAfter: [
    {
      markerModuleName: PERSONALIZATION_MODULE,
      featureModuleName: SEGMENT_REFS_MODULE,
    },
  ],
};
