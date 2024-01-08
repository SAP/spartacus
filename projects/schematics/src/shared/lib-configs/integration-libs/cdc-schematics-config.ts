/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CDC_FEATURE_NAME,
  SPARTACUS_CDC,
  SPARTACUS_CDC_USER_ACCOUNT,
  SPARTACUS_CDC_USER_PROFILE,
  SPARTACUS_CDC_ROOT,
  USER_PROFILE_FEATURE_NAME,
  ORGANIZATION_ADMINISTRATION_FEATURE_NAME,
  ORGANIZATION_USER_REGISTRATION_FEATURE_NAME,
  SPARTACUS_CDC_ORGANIZATION_ADMINISTRATION,
  SPARTACUS_CDC_ASSETS,
  SPARTACUS_CDC_ORGANIZATION_REGISTRATION,
  CDC_B2B_FEATURE_NAME,
} from '../../libs-constants';
import { AdditionalFeatureConfiguration } from '../../utils/feature-utils';
import { LibraryOptions, SchematicConfig } from '../../utils/lib-utils';
import {
  ADMINISTRATION_MODULE,
  ORGANIZATION_USER_REGISTRATION_MODULE,
} from '../organization-schematics-config';
import {
  USER_ACCOUNT_MODULE,
  USER_PROFILE_MODULE,
} from '../user-schematics-config';

export interface SpartacusCdcOptions extends LibraryOptions {
  baseSite?: string;
  javascriptUrl?: string;
  sessionExpiration?: number;
}

export const CDC_FOLDER_NAME = 'cdc';
export const CDC_MODULE_NAME = 'Cdc';

export const CDC_MODULE = 'CdcModule';
export const CDC_ROOT_MODULE = 'CdcRootModule';
export const CDC_FEATURE_CONSTANT = 'CDC_FEATURE';
export const CDC_CONFIG = 'CdcConfig';

export const CDC_USER_ACCOUNT_MODULE = 'CDCUserAccountModule';

export const CDC_USER_PROFILE_MODULE = 'CDCUserProfileModule';
export const CDC_ADMINISTRATION_MODULE = 'CdcAdministrationModule';
export const CDC_B2B_REGISTER_MODULE = 'CDCB2BRegisterModule';

export const CDC_TRANSLATION_CHUNKS_CONFIG = 'cdcTranslationChunksConfig';
export const CDC_TRANSLATIONS = 'cdcTranslations';

const CDC_SHARED_FEATURE_MODULES = [
  {
    importPath: SPARTACUS_CDC,
    name: CDC_MODULE,
  },
  {
    name: CDC_USER_ACCOUNT_MODULE,
    importPath: SPARTACUS_CDC_USER_ACCOUNT,
  },
  {
    name: CDC_USER_PROFILE_MODULE,
    importPath: SPARTACUS_CDC_USER_PROFILE,
  },
];

const CDC_SHARED_IMPORT_AFTER = [
  {
    markerModuleName: USER_ACCOUNT_MODULE,
    featureModuleName: CDC_USER_ACCOUNT_MODULE,
  },
  {
    markerModuleName: USER_PROFILE_MODULE,
    featureModuleName: CDC_USER_PROFILE_MODULE,
  },
];

const CDC_SHARED_DEPENDENCY_FEATURES = [USER_PROFILE_FEATURE_NAME];

const CDC_SHARED_CONFIG = {
  folderName: CDC_FOLDER_NAME,
  moduleName: CDC_MODULE_NAME,
  lazyLoadingChunk: {
    moduleSpecifier: SPARTACUS_CDC_ROOT,
    namedImports: [CDC_FEATURE_CONSTANT],
  },
  rootModule: {
    importPath: SPARTACUS_CDC_ROOT,
    name: CDC_ROOT_MODULE,
    content: `${CDC_ROOT_MODULE}`,
  },
  customConfig: buildCdcConfig,
  i18n: {
    resources: CDC_TRANSLATIONS,
    chunks: CDC_TRANSLATION_CHUNKS_CONFIG,
    importPath: SPARTACUS_CDC_ASSETS,
  },
};

export const CDC_B2B_SCHEMATICS_CONFIG: SchematicConfig = {
  library: {
    featureName: CDC_B2B_FEATURE_NAME,
    mainScope: SPARTACUS_CDC,
    b2b: true,
  },
  ...CDC_SHARED_CONFIG,
  featureModule: [
    ...CDC_SHARED_FEATURE_MODULES,
    {
      name: CDC_ADMINISTRATION_MODULE,
      importPath: SPARTACUS_CDC_ORGANIZATION_ADMINISTRATION,
    },
    {
      name: CDC_B2B_REGISTER_MODULE,
      importPath: SPARTACUS_CDC_ORGANIZATION_REGISTRATION,
    },
  ],
  dependencyFeatures: [
    ...CDC_SHARED_DEPENDENCY_FEATURES,
    ORGANIZATION_ADMINISTRATION_FEATURE_NAME,
    ORGANIZATION_USER_REGISTRATION_FEATURE_NAME,
  ],
  importAfter: [
    ...CDC_SHARED_IMPORT_AFTER,
    {
      markerModuleName: ADMINISTRATION_MODULE,
      featureModuleName: CDC_ADMINISTRATION_MODULE,
    },
    {
      markerModuleName: ORGANIZATION_USER_REGISTRATION_MODULE,
      featureModuleName: CDC_B2B_REGISTER_MODULE,
    },
  ],
};

export const CDC_SCHEMATICS_CONFIG: SchematicConfig = {
  library: {
    featureName: CDC_FEATURE_NAME,
    mainScope: SPARTACUS_CDC,
  },
  ...CDC_SHARED_CONFIG,
  featureModule: [...CDC_SHARED_FEATURE_MODULES],
  dependencyFeatures: [...CDC_SHARED_DEPENDENCY_FEATURES],
  importAfter: [...CDC_SHARED_IMPORT_AFTER],
};

function buildCdcConfig(
  options: SpartacusCdcOptions
): AdditionalFeatureConfiguration<SpartacusCdcOptions> {
  return {
    providers: {
      import: [
        {
          moduleSpecifier: SPARTACUS_CDC_ROOT,
          namedImports: [CDC_CONFIG],
        },
      ],
      content: `<${CDC_CONFIG}>{
        cdc: [
          {
            baseSite: '${options.baseSite || 'BASE_SITE_PLACEHOLDER'}',
            javascriptUrl: '${
              options.javascriptUrl || 'JS_SDK_URL_PLACEHOLDER'
            }',
            sessionExpiration: ${options.sessionExpiration || 3600}
          },
        ],
      }`,
    },
  };
}
