import {
  SPARTACUS_STOREFRONTLIB,
  SEARCH_BOX_COMPONENT,
  ANGULAR_CORE,
  WINDOW_REF,
  CMS_COMPONENT_DATA_CLASS,
  SPARTACUS_CORE,
  SEARCH_BOX_COMPONENT_SERVICE,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const SEARCH_BOX_COMPONENT_MIGRATION: ConstructorDeprecation = {
  // projects\storefrontlib\src\cms-components\navigation\search-box\search-box.component.ts
  class: SEARCH_BOX_COMPONENT,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
    {
      className: SEARCH_BOX_COMPONENT_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: CMS_COMPONENT_DATA_CLASS,
      importPath: SPARTACUS_CORE,
    },
  ],
  addParams: [
    {
      className: WINDOW_REF,
      importPath: ANGULAR_CORE,
    },
  ],
};
