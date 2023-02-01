/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CHECKOUT_BASE_FEATURE_NAME,
  OPF_FEATURE_NAME,
  SPARTACUS_OPF,
  SPARTACUS_OPF_ASSETS,
  SPARTACUS_OPF_ROOT,
} from '../../libs-constants';
import { SchematicConfig } from '../../utils/lib-utils';
import { CHECKOUT_BASE_MODULE } from '../checkout-schematics-config';

export const OPF_FOLDER_NAME = 'opf';
export const OPF_MODULE_NAME = 'Opf';
export const OPF_SCSS_FILE_NAME = 'opf.scss';

export const OPF_FEATURE_NAME_CONSTANT = 'OPF_FEATURE';
export const OPF_MODULE = 'OpfModule';
export const OPF_ROOT_MODULE = 'OpfRootModule';
export const OPF_TRANSLATIONS = 'opfTranslations';
export const OPF_TRANSLATION_CHUNKS_CONFIG = 'opfTranslationChunksConfig';

export const OPF_SCHEMATICS_CONFIG: SchematicConfig = {
  library: {
    featureName: OPF_FEATURE_NAME,
    mainScope: SPARTACUS_OPF,
  },
  folderName: OPF_FOLDER_NAME,
  moduleName: OPF_MODULE_NAME,
  featureModule: {
    name: OPF_MODULE,
    importPath: SPARTACUS_OPF,
  },
  rootModule: {
    name: OPF_ROOT_MODULE,
    importPath: SPARTACUS_OPF_ROOT,
  },
  i18n: {
    resources: OPF_TRANSLATIONS,
    chunks: OPF_TRANSLATION_CHUNKS_CONFIG,
    importPath: SPARTACUS_OPF_ASSETS,
  },
  styles: {
    scssFileName: OPF_SCSS_FILE_NAME,
    importStyle: SPARTACUS_OPF,
  },
  dependencyFeatures: [CHECKOUT_BASE_FEATURE_NAME],
  importAfter: [
    {
      markerModuleName: CHECKOUT_BASE_MODULE,
      featureModuleName: OPF_MODULE,
    },
  ],
};
