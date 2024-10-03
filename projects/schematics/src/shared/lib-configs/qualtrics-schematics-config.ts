/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  QUALTRICS_FEATURE_NAME,
  SPARTACUS_QUALTRICS,
  SPARTACUS_QUALTRICS_ROOT,
} from '../libs-constants';
import { SchematicConfig } from '../utils/lib-utils';

export const QUALTRICS_FOLDER_NAME = 'qualtrics';
export const QUALTRICS_MODULE_NAME = 'Qualtrics';
export const QUALTRICS_EMBEDDED_FEEDBACK_SCSS_FILE_NAME =
  'qualtrics-embedded-feedback.scss';

export const QUALTRICS_MODULE = 'QualtricsModule';
export const QUALTRICS_ROOT_MODULE = 'QualtricsRootModule';
export const QUALTRICS_FEATURE_NAME_CONSTANT = 'QUALTRICS_FEATURE';

export const QUALTRICS_SCHEMATICS_CONFIG: SchematicConfig = {
  library: {
    featureName: QUALTRICS_FEATURE_NAME,
    mainScope: SPARTACUS_QUALTRICS,
  },
  folderName: QUALTRICS_FOLDER_NAME,
  moduleName: QUALTRICS_MODULE_NAME,
  featureModule: {
    name: QUALTRICS_MODULE,
    importPath: SPARTACUS_QUALTRICS,
  },
  rootModule: {
    name: QUALTRICS_ROOT_MODULE,
    importPath: SPARTACUS_QUALTRICS_ROOT,
  },
  lazyLoadingChunk: {
    moduleSpecifier: SPARTACUS_QUALTRICS_ROOT,
    namedImports: [QUALTRICS_FEATURE_NAME_CONSTANT],
  },
  styles: {
    scssFileName: QUALTRICS_EMBEDDED_FEEDBACK_SCSS_FILE_NAME,
    importStyle: SPARTACUS_QUALTRICS,
  },
};
