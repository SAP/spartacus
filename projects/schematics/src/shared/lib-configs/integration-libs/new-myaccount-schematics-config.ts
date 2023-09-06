/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  NEW_MYACCOUNT_FEATURE_NAME,
  SPARTACUS_NEW_MYACCOUNT,
  SPARTACUS_NEW_MYACCOUNT_ASSETS,
} from '../../libs-constants';
import { SchematicConfig } from '../../utils/lib-utils';
export const NEW_MYACCOUNT_FOLDER_NAME = 'new-myaccount';
export const NEW_MYACCOUNT_MODULE_NAME = 'New-MyAccount';
export const NEW_MYACCOUNT_MODULE = 'NewMyAccountModule';
export const NEW_MYACCOUNT_TRANSLATIONS = 'newMyAccountTranslations';
export const NEW_MYACCOUNT_TRANSLATION_CHUNKS_CONFIG =
  'newMyAccountTranslationChunksConfig';
export const NEW_MYACCOUNT_SCSS_FILE_NAME = 'new-myaccount.scss';

export const NEW_MYACCOUNT_SCHEMATICS_CONFIG: SchematicConfig = {
  library: {
    featureName: NEW_MYACCOUNT_FEATURE_NAME,
    mainScope: SPARTACUS_NEW_MYACCOUNT,
  },
  folderName: NEW_MYACCOUNT_FOLDER_NAME,
  moduleName: NEW_MYACCOUNT_MODULE_NAME,
  featureModule: [
    {
      importPath: SPARTACUS_NEW_MYACCOUNT,
      name: NEW_MYACCOUNT_MODULE,
    },
  ],
  i18n: {
    resources: NEW_MYACCOUNT_TRANSLATIONS,
    chunks: NEW_MYACCOUNT_TRANSLATION_CHUNKS_CONFIG,
    importPath: SPARTACUS_NEW_MYACCOUNT_ASSETS,
  },
  styles: {
    scssFileName: NEW_MYACCOUNT_SCSS_FILE_NAME, //but so file exists with this name. should re-chec this
    importStyle: SPARTACUS_NEW_MYACCOUNT,
  },
};
