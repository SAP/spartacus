/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  S4_SERVICE_FEATURE_NAME,
  SPARTACUS_S4_SERVICE,
  SPARTACUS_S4_SERVICE_ROOT,
  SPARTACUS_S4_SERVICE_ASSETS,
} from '../../libs-constants';
import { SchematicConfig } from '../../utils';

export const S4_SERVICE_FOLDER_NAME = 's4-service';
export const S4_SERVICE_MODULE_NAME = 'S4Service';
export const S4_SERVICE_SCSS_FILE_NAME = 's4-service.scss';

export const S4_SERVICE_MODULE = 'S4ServiceModule';
export const S4_SERVICE_ROOT_MODULE = 'S4ServiceRootModule';
export const S4_SERVICE_FEATURE_NAME_CONSTANT = 'S4_SERVICE_FEATURE';
export const S4_SERVICE_TRANSLATIONS = 's4ServiceTranslations';
export const S4_SERVICE_TRANSLATION_CHUNKS_CONFIG =
  's4ServiceTranslationChunksConfig';

export const S4_SERVICE_SCHEMATICS_CONFIG: SchematicConfig = {
  library: {
    featureName: S4_SERVICE_FEATURE_NAME,
    mainScope: SPARTACUS_S4_SERVICE,
  },
  folderName: S4_SERVICE_FOLDER_NAME,
  moduleName: S4_SERVICE_MODULE_NAME,
  featureModule: {
    name: S4_SERVICE_MODULE,
    importPath: SPARTACUS_S4_SERVICE,
  },
  rootModule: {
    name: S4_SERVICE_ROOT_MODULE,
    importPath: SPARTACUS_S4_SERVICE_ROOT,
  },
  lazyLoadingChunk: {
    moduleSpecifier: SPARTACUS_S4_SERVICE_ROOT,
    namedImports: [S4_SERVICE_FEATURE_NAME_CONSTANT],
  },
  i18n: {
    resources: S4_SERVICE_TRANSLATIONS,
    chunks: S4_SERVICE_TRANSLATION_CHUNKS_CONFIG,
    importPath: SPARTACUS_S4_SERVICE_ASSETS,
  },
  styles: {
    scssFileName: S4_SERVICE_SCSS_FILE_NAME,
    importStyle: SPARTACUS_S4_SERVICE,
  },
  dependencyFeatures: [],
};
