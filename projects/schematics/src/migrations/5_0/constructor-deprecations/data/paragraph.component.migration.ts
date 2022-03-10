import {
  ANGULAR_ROUTER,
  CMS_COMPONENT_DATA_CLASS,
  PARAGRAPH_COMPONENT,
  ROUTER,
  SPARTACUS_STOREFRONTLIB,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const PARAGRAPH_COMPONENT_MIGRATION: ConstructorDeprecation = {
  // projects/storefrontlib/cms-components/content/paragraph/paragraph.component.ts
  class: PARAGRAPH_COMPONENT,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
    {
      className: CMS_COMPONENT_DATA_CLASS,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
  ],
  addParams: [{ className: ROUTER, importPath: ANGULAR_ROUTER }],
};
