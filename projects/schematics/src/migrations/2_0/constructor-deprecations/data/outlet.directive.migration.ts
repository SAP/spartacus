import {
  ANGULAR_CORE,
  DEFER_LOADER_SERVICE,
  OUTLET_DIRECTIVE,
  OUTLET_SERVICE,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
  TEMPLATE_REF,
  VIEW_CONTAINER_REF,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const OUTLET_DIRECTIVE_MIGRATION: ConstructorDeprecation = {
  // projects/storefrontlib/src/cms-structure/outlet/outlet.directive.ts
  class: OUTLET_DIRECTIVE,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
    {
      className: VIEW_CONTAINER_REF,
      importPath: ANGULAR_CORE,
    },
    {
      className: TEMPLATE_REF,
      importPath: SPARTACUS_CORE,
    },
    {
      className: OUTLET_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
  ],
  addParams: [
    {
      className: DEFER_LOADER_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
  ],
};
