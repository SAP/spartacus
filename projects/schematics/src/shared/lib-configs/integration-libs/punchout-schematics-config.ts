/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  PUNCHOUT_FEATURE_NAME,
  SPARTACUS_BOOTSTRAP_FUNCTIONS,
  SPARTACUS_BOOTSTRAP_MIXINS,
  SPARTACUS_BOOTSTRAP_VARIABLES,
  SPARTACUS_PUNCHOUT,
  SPARTACUS_PUNCHOUT_ASSETS,
  SPARTACUS_PUNCHOUT_ROOT,
} from '../../libs-constants';
import { SchematicConfig } from '../../utils/lib-utils';

export const PUNCHOUT_SCSS_FILE_NAME = 'punchout.scss';
export const PUNCHOUT_FOLDER_NAME = 'punchout';
export const PUNCHOUT_MODULE_NAME = 'Punchout';
export const PUNCHOUT_MODULE = 'PunchoutModule';
export const PUNCHOUT_ROOT_MODULE = 'PunchoutRootModule';
export const PUNCHOUT_FEATURE_NAME_CONSTANT = 'PUNCHOUT_FEATURE';
export const PUNCHOUT_TRANSLATIONS = 'punchoutTranslations';
export const PUNCHOUT_TRANSLATION_CHUNKS_CONFIG =
  'punchoutTranslationChunksConfig';

export const PUNCHOUT_SCHEMATICS_CONFIG: SchematicConfig = {
  library: {
    featureName: PUNCHOUT_FEATURE_NAME,
    mainScope: SPARTACUS_PUNCHOUT,
    b2b: true,
  },
  folderName: PUNCHOUT_FOLDER_NAME,
  moduleName: PUNCHOUT_MODULE_NAME,
  featureModule: {
    name: PUNCHOUT_MODULE,
    importPath: SPARTACUS_PUNCHOUT,
  },
  rootModule: {
    name: PUNCHOUT_ROOT_MODULE,
    importPath: SPARTACUS_PUNCHOUT_ROOT,
  },
  lazyLoadingChunk: {
    moduleSpecifier: SPARTACUS_PUNCHOUT_ROOT,
    namedImports: [PUNCHOUT_FEATURE_NAME_CONSTANT],
  },
  i18n: {
    resources: PUNCHOUT_TRANSLATIONS,
    chunks: PUNCHOUT_TRANSLATION_CHUNKS_CONFIG,
    importPath: SPARTACUS_PUNCHOUT_ASSETS,
  },
  styles: {
    scssFileName: PUNCHOUT_SCSS_FILE_NAME,
    importStyle: SPARTACUS_PUNCHOUT,
    importStyles: [
      SPARTACUS_BOOTSTRAP_FUNCTIONS,
      SPARTACUS_BOOTSTRAP_VARIABLES,
      SPARTACUS_BOOTSTRAP_MIXINS,
    ],
  },
};
