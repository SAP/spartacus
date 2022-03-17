import {
  SPARTACUS_PERSONALIZATION,
  SPARTACUS_PERSONALIZATION_ROOT,
  SPARTACUS_TMS_AEP,
  SPARTACUS_TMS_CORE,
  SPARTACUS_TMS_GTM,
} from '../libs-constants';
import { FeatureConfig } from '../utils/lib-utils';

export const TRACKING_FOLDER_NAME = 'tracking';

export const PERSONALIZATION_MODULE = 'PersonalizationModule';
export const PERSONALIZATION_ROOT_MODULE = 'PersonalizationRootModule';
export const PERSONALIZATION_MODULE_NAME = 'Personalization';
export const PERSONALIZATION_FEATURE_NAME_CONSTANT = 'PERSONALIZATION_FEATURE';

export const TRACKING_PERSONALIZATION_SCHEMATICS_CONFIG: FeatureConfig = {
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
};

export const TMS_MODULE_NAME = 'TagManagement';
export const TMS_CONFIG = 'TmsConfig';
export const TMS_BASE_MODULE = 'BaseTmsModule';
export const TMS_GTM_MODULE = 'GtmModule';

export const TRACKING_GTM_SCHEMATICS_CONFIG: FeatureConfig = {
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
  customConfig: {
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
};

export const TMS_AEP_MODULE = 'AepModule';
export const TRACKING_AEP_SCHEMATICS_CONFIG: FeatureConfig = {
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
  customConfig: {
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
};
