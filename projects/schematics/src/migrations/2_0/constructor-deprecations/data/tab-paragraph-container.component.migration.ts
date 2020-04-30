import {
  SPARTACUS_STOREFRONTLIB,
  ANGULAR_CORE,
  TAB_PARAGRAPH_CONTAINER_COMPONENT,
  CMS_COMPONENT_DATA_CLASS,
  CMS_SERVICE,
  SPARTACUS_CORE,
  WINDOW_REF,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const TAB_PARAGRAPH_CONTAINER_COMPONENT_MIGRATION: ConstructorDeprecation = {
  // projects\storefrontlib\src\cms-components\content\tab-paragraph-container\tab-paragraph-container.component.ts
  class: TAB_PARAGRAPH_CONTAINER_COMPONENT,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
    {
      className: CMS_COMPONENT_DATA_CLASS,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
    { className: CMS_SERVICE, importPath: SPARTACUS_CORE },
  ],
  addParams: [
    {
      className: WINDOW_REF,
      importPath: ANGULAR_CORE,
    },
  ],
};
