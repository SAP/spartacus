/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  SPARTACUS_PERSONALIZATION,
  SPARTACUS_PERSONALIZATION_ROOT,
  SPARTACUS_TMS_AEP,
  SPARTACUS_TMS_CORE,
  SPARTACUS_TMS_GTM,
  SPARTACUS_TRACKING,
  TRACKING_PERSONALIZATION_FEATURE_NAME,
  TRACKING_TMS_AEP_FEATURE_NAME,
  TRACKING_TMS_GTM_FEATURE_NAME,
  USER_PROFILE_FEATURE_NAME,
} from '../libs-constants';
import { AdditionalFeatureConfiguration } from '../utils/feature-utils';
import { LibraryOptions, SchematicConfig } from '../utils/lib-utils';

export const TRACKING_FOLDER_NAME = 'tracking';

export const PERSONALIZATION_MODULE = 'PersonalizationModule';
export const PERSONALIZATION_ROOT_MODULE = 'PersonalizationRootModule';
export const PERSONALIZATION_MODULE_NAME = 'Personalization';
export const PERSONALIZATION_FEATURE_NAME_CONSTANT = 'PERSONALIZATION_FEATURE';

export const TRACKING_PERSONALIZATION_SCHEMATICS_CONFIG: SchematicConfig = {
  library: {
    featureName: TRACKING_PERSONALIZATION_FEATURE_NAME,
    mainScope: SPARTACUS_TRACKING,
    featureScope: SPARTACUS_PERSONALIZATION,
  },
  folderName: TRACKING_FOLDER_NAME,
  moduleName: PERSONALIZATION_MODULE_NAME,
  featureModule: {
    name: PERSONALIZATION_MODULE,
    importPath: SPARTACUS_PERSONALIZATION,
  },
  rootModule: {
    name: PERSONALIZATION_ROOT_MODULE,
    importPath: SPARTACUS_PERSONALIZATION_ROOT,
  },
  lazyLoadingChunk: {
    moduleSpecifier: SPARTACUS_PERSONALIZATION_ROOT,
    namedImports: [PERSONALIZATION_FEATURE_NAME_CONSTANT],
  },
  dependencyFeatures: [USER_PROFILE_FEATURE_NAME],
};

export const TMS_MODULE_NAME = 'TagManagement';
export const TMS_CONFIG = 'TmsConfig';
export const TMS_BASE_MODULE = 'BaseTmsModule';
export const TMS_GTM_MODULE = 'GtmModule';

export const TRACKING_GTM_SCHEMATICS_CONFIG: SchematicConfig = {
  library: {
    featureName: TRACKING_TMS_GTM_FEATURE_NAME,
    mainScope: SPARTACUS_TRACKING,
    featureScope: SPARTACUS_TMS_GTM,
  },
  folderName: TRACKING_FOLDER_NAME,
  moduleName: TMS_MODULE_NAME,
  featureModule: {
    name: TMS_GTM_MODULE,
    importPath: SPARTACUS_TMS_GTM,
  },
  rootModule: {
    name: TMS_BASE_MODULE,
    importPath: SPARTACUS_TMS_CORE,
    content: `${TMS_BASE_MODULE}.forRoot()`,
  },
  customConfig: buildGtmConfig,
  dependencyFeatures: [USER_PROFILE_FEATURE_NAME],
};
function buildGtmConfig(
  options: LibraryOptions
): AdditionalFeatureConfiguration {
  return {
    providers: {
      import: [
        {
          moduleSpecifier: SPARTACUS_TMS_GTM,
          namedImports: [TMS_GTM_MODULE],
        },
        { moduleSpecifier: SPARTACUS_TMS_CORE, namedImports: [TMS_CONFIG] },
      ],
      content: `<${TMS_CONFIG}>{
      tagManager: {
        gtm: {
          events: [],
        },
      },
    }`,
    },
    options: {
      // Just import the feature module
      ...options,
      lazy: false,
    },
  };
}

export const TMS_AEP_MODULE = 'AepModule';

export const TRACKING_AEP_SCHEMATICS_CONFIG: SchematicConfig = {
  library: {
    featureName: TRACKING_TMS_AEP_FEATURE_NAME,
    mainScope: SPARTACUS_TRACKING,
    featureScope: SPARTACUS_TMS_AEP,
  },
  folderName: TRACKING_FOLDER_NAME,
  moduleName: TMS_MODULE_NAME,
  featureModule: {
    name: TMS_AEP_MODULE,
    importPath: SPARTACUS_TMS_AEP,
  },
  rootModule: {
    name: TMS_BASE_MODULE,
    importPath: SPARTACUS_TMS_CORE,
    content: `${TMS_BASE_MODULE}.forRoot()`,
  },
  customConfig: buildAepConfig,
  dependencyFeatures: [USER_PROFILE_FEATURE_NAME],
};

function buildAepConfig(
  options: LibraryOptions
): AdditionalFeatureConfiguration {
  return {
    providers: {
      import: [
        {
          moduleSpecifier: SPARTACUS_TMS_AEP,
          namedImports: [TMS_AEP_MODULE],
        },
        { moduleSpecifier: SPARTACUS_TMS_CORE, namedImports: [TMS_CONFIG] },
      ],
      content: `<${TMS_CONFIG}>{
      tagManager: {
        aep: {
          events: [],
        },
      },
    }`,
    },
    options: {
      // Just import the feature module
      ...options,
      lazy: false,
    },
  };
}
