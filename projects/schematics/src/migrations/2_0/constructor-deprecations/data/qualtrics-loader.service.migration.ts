import {
  ANGULAR_CORE,
  QUALTRICS_CONFIG,
  QUALTRICS_LOADER_SERVICE,
  RENDERER_FACTORY_2,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
  WINDOW_REF,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const QUALTRICS_LOADER_MIGRATION: ConstructorDeprecation = {
  // projects/storefrontlib/src/cms-components/misc/qualtrics/qualtrics-loader.service.ts
  class: QUALTRICS_LOADER_SERVICE,
  importPath: SPARTACUS_STOREFRONTLIB,

  deprecatedParams: [
    {
      className: WINDOW_REF,
      importPath: SPARTACUS_CORE,
    },
    {
      className: QUALTRICS_CONFIG,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
  ],
  removeParams: [
    {
      className: QUALTRICS_CONFIG,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
  ],
  addParams: [
    {
      className: RENDERER_FACTORY_2,
      importPath: ANGULAR_CORE,
    },
  ],
};
