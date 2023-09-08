/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  MYACCOUNT_ENHANCED_UI_FEATURE_NAME,
  SPARTACUS_MYACCOUNT_ENHANCED_UI,
  SPARTACUS_MYACCOUNT_ENHANCED_UI_ASSETS,
} from '../../libs-constants';
import { SchematicConfig } from '../../utils/lib-utils';
export const MYACCOUNT_ENHANCED_UI_FOLDER_NAME = 'myaccount-enhanced-ui';
export const MYACCOUNT_ENHANCED_UI_MODULE_NAME = 'MyAccount-Enhanced-UI';
export const MYACCOUNT_ENHANCED_UI_MODULE = 'MyAccountEnhancedUIModule';
export const MYACCOUNT_ENHANCED_UI_TRANSLATIONS =
  'myAccountEnhancedUITranslations';
export const MYACCOUNT_ENHANCED_UI_TRANSLATION_CHUNKS_CONFIG =
  'myAccountEnhancedUITranslationChunksConfig';
export const MYACCOUNT_ENHANCED_UI_SCSS_FILE_NAME = 'myaccount-enhanced-ui.scss';

export const MYACCOUNT_ENHANCED_UI_SCHEMATICS_CONFIG: SchematicConfig = {
  library: {
    featureName: MYACCOUNT_ENHANCED_UI_FEATURE_NAME,
    mainScope: SPARTACUS_MYACCOUNT_ENHANCED_UI,
  },
  folderName: MYACCOUNT_ENHANCED_UI_FOLDER_NAME,
  moduleName: MYACCOUNT_ENHANCED_UI_MODULE_NAME,
  featureModule: [
    {
      importPath: SPARTACUS_MYACCOUNT_ENHANCED_UI,
      name: MYACCOUNT_ENHANCED_UI_MODULE,
    },
  ],
  i18n: {
    resources: MYACCOUNT_ENHANCED_UI_TRANSLATIONS,
    chunks: MYACCOUNT_ENHANCED_UI_TRANSLATION_CHUNKS_CONFIG,
    importPath: SPARTACUS_MYACCOUNT_ENHANCED_UI_ASSETS,
  },
  styles: {
    scssFileName: MYACCOUNT_ENHANCED_UI_SCSS_FILE_NAME, //but so file exists with this name. should re-chec this
    importStyle: SPARTACUS_MYACCOUNT_ENHANCED_UI,
  },
};
