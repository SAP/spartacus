/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  SEGMENT_REFS_FEATURE_NAME,
  SPARTACUS_SEGMENT_REFS,
  SPARTACUS_SEGMENT_REFS_ROOT,
  TRACKING_PERSONALIZATION_FEATURE_NAME,
} from '../../libs-constants';
import { SchematicConfig } from '../../utils/lib-utils';

export const SEGMENT_REFS_FOLDER_NAME = 'segment-refs';
export const SEGMENT_REFS_MODULE_NAME = 'SegmentRefs';
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
    name: SEGMENT_REFS_ROOT_MODULE,
    importPath: SPARTACUS_SEGMENT_REFS,
  },
  rootModule: {
    importPath: SPARTACUS_SEGMENT_REFS_ROOT,
    name: SEGMENT_REFS_ROOT_MODULE,
    content: `${SEGMENT_REFS_ROOT_MODULE}`,
  },
  /* Through Spartacus Segment-refs code doesnot have a dependency on Personalization,
  backend occ api of Segment-refs requires Personalization to be enabled , hence adding this dependency
  If Personalization library is not installed, Personalization & Segment-refs won't apply */
  dependencyFeatures: [TRACKING_PERSONALIZATION_FEATURE_NAME],
};
