import {
  ROUTING_SERVICE,
  SEARCH_BOX_COMPONENT,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const SEARCH_BOX_COMPONENT_MIGRATION: ConstructorDeprecation = {
  // storefrontlibs\scr\cms-components\navigation\search-box\search-box.component.ts
  class: SEARCH_BOX_COMPONENT,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [],
  addParams: [
    {
      className: ROUTING_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
};
