import {
  ACTION_SUBJECT,
  ANGULAR_CORE,
  CMS_COMPONENTS_SERVICE,
  CMS_FEATURES_SERVICE,
  CONFIG_INITIALIZER_SERVICE,
  FEATURE_MODULES_SERVICE,
  OBJECT_TYPE,
  PLATFORM,
  PLATFORM_ID_STRING,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const CMS_COMPONENTS_SERVICE_MIGRATION_1: ConstructorDeprecation = {
  class: CMS_COMPONENTS_SERVICE,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
    {
      className: PLATFORM,
      literalInference: OBJECT_TYPE,
      injectionToken: {
        token: PLATFORM_ID_STRING,
        importPath: ANGULAR_CORE,
      },
    },
  ],
  addParams: [
    { className: ACTION_SUBJECT, importPath: SPARTACUS_STOREFRONTLIB },
    { className: CONFIG_INITIALIZER_SERVICE, importPath: SPARTACUS_CORE },
  ],
};

export const CMS_COMPONENTS_SERVICE_MIGRATION_2: ConstructorDeprecation = {
  class: CMS_COMPONENTS_SERVICE,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
    {
      className: PLATFORM,
      literalInference: OBJECT_TYPE,
      injectionToken: {
        token: PLATFORM_ID_STRING,
        importPath: ANGULAR_CORE,
      },
    },
    { className: FEATURE_MODULES_SERVICE, importPath: SPARTACUS_STOREFRONTLIB },
  ],
  removeParams: [
    { className: FEATURE_MODULES_SERVICE, importPath: SPARTACUS_STOREFRONTLIB },
  ],
  addParams: [
    { className: CMS_FEATURES_SERVICE, importPath: SPARTACUS_STOREFRONTLIB },
    { className: CONFIG_INITIALIZER_SERVICE, importPath: SPARTACUS_CORE },
  ],
};
