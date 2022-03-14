import {
  BREAKPOINT_SERVICE,
  CMS_COMPONENT_DATA_CLASS,
  CMS_SERVICE,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
  TAB_PARAGRAPH_CONTAINER__COMPONENT,
  WINDOW_REF,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const TAB_PARAGRAPH_CONTAINER__COMPONENT_MIGRATION: ConstructorDeprecation =
  {
    // projects/storefrontlib/cms-components/content/tab-paragraph-container/tab-paragraph-container.component.ts
    class: TAB_PARAGRAPH_CONTAINER__COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
      {
        className: CMS_COMPONENT_DATA_CLASS,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
      {
        className: CMS_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: BREAKPOINT_SERVICE,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
      {
        className: WINDOW_REF,
        importPath: SPARTACUS_CORE,
      },
    ],
    removeParams: [
      {
        className: BREAKPOINT_SERVICE,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
    ],
  };
