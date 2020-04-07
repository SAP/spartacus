import {
  SPARTACUS_STOREFRONTLIB,
  SEARCH_BOX_COMPONENT,
  ANGULAR_CORE,
  WINDOW_REF,
  CMS_SEARCH_BOX_COMPONENT
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const SEARCH_BOX_COMPONENT_MIGRATION: ConstructorDeprecation = {
  // projects\storefrontlib\src\cms-components\navigation\search-box\search-box.component.ts
  class: SEARCH_BOX_COMPONENT,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
    {
      className: CMS_SEARCH_BOX_COMPONENT,
      importPath: ANGULAR_CORE
    }
  ],
  addParams: [
    {
      className: WINDOW_REF,
      importPath: ANGULAR_CORE
    }
  ]
};
