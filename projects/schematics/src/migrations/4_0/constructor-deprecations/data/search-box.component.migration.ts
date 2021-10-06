import {
  CMS_COMPONENT_DATA_CLASS,
  ROUTING_SERVICE,
  SEARCH_BOX_COMPONENT,
  SEARCH_BOX_COMPONENT_SERVICE,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
  WINDOW_REF,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const SEARCH_BOX_COMPONENT_MIGRATION: ConstructorDeprecation = {
  // storefrontlibs\scr\cms-components\navigation\search-box\search-box.component.ts
  class: SEARCH_BOX_COMPONENT,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
    { className: SEARCH_BOX_COMPONENT_SERVICE, importPath: SPARTACUS_CORE },
    {
      className: CMS_COMPONENT_DATA_CLASS,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
    { className: WINDOW_REF, importPath: SPARTACUS_CORE },
  ],
  addParams: [
    {
      className: ROUTING_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
};
