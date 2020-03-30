import {
  SPARTACUS_STOREFRONTLIB,
  OUTLET_DIRECTIVE,
  VIEW_CONTAINER_REF,
  SPARTACUS_CORE,
  TEMPLATE_REF,
  OUTLET_SERVICE,
  DEFER_LOADER_SERVICE,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const OUTLET_DIRECTIVE_MIGRATION: ConstructorDeprecation = {
  // projects/storefrontlib/src/cms-structure/outlet/outlet.directive.ts
  class: OUTLET_DIRECTIVE,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
    {
      className: VIEW_CONTAINER_REF,
      importPath: SPARTACUS_CORE,
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
