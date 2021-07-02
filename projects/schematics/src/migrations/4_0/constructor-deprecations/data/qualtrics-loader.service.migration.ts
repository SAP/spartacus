import {
  ANGULAR_CORE,
  ANY_TYPE,
  PLATFORM,
  PLATFORM_ID_STRING,
  QUALTRICS_LOADER_SERVICE,
  RENDERER_FACTORY_2,
  SCRIPT_LOADER_SERVICE,
  SPARTACUS_CORE,
  SPARTACUS_QUALTRICS_COMPONENTS,
  WINDOW_REF,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const QUALTRICS_LOADER_SERVICE_MIGRATION: ConstructorDeprecation = {
  // feature-libs/qualtrics/components/qualtrics-loader/qualtrics-loader.service.ts
  class: QUALTRICS_LOADER_SERVICE,
  importPath: SPARTACUS_QUALTRICS_COMPONENTS,
  deprecatedParams: [
    {
      className: WINDOW_REF,
      importPath: SPARTACUS_CORE,
    },
    {
      className: RENDERER_FACTORY_2,
      importPath: ANGULAR_CORE,
    },
    {
      className: PLATFORM,
      literalInference: ANY_TYPE,
      injectionToken: {
        token: PLATFORM_ID_STRING,
        importPath: ANGULAR_CORE,
      },
    },
  ],
  removeParams: [
    {
      className: RENDERER_FACTORY_2,
      importPath: ANGULAR_CORE,
    },
  ],
  addParams: [
    {
      className: SCRIPT_LOADER_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
};
