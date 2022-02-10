import {
  ANGULAR_CORE,
  FEATURE_CONFIG_SERVICE,
  OUTLET_REF_DIRECTIVE,
  OUTLET_SERVICE,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
  TEMPLATE_REF,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const OUTLET_REF_DIRECTIVE_CONSTRUCTOR_MIGRATION: ConstructorDeprecation =
  // projects/storefrontlib/cms-structure/outlet/outlet-ref/outlet-ref.directive.ts

  {
    class: OUTLET_REF_DIRECTIVE,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
      {
        className: TEMPLATE_REF,
        importPath: ANGULAR_CORE,
      },

      {
        className: OUTLET_SERVICE,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
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
