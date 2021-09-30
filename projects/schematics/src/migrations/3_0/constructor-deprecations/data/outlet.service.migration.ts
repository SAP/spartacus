import {
  FEATURE_CONFIG_SERVICE,
  OUTLET_SERVICE,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const OUTLET_SERVICE_CONSTRUCTOR_MIGRATION: ConstructorDeprecation =
  // projects/storefrontlib/cms-structure/outlet/outlet.service.ts

  {
    class: OUTLET_SERVICE,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
      {
        className: FEATURE_CONFIG_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
    removeParams: [
      {
        className: FEATURE_CONFIG_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
  };
