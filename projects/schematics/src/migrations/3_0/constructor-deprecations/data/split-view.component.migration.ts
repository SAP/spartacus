import {
  SPLIT_VIEW_COMPONENT,
  SPARTACUS_STOREFRONTLIB,
  SPLIT_VIEW_SERVICE,
  BREAKPOINT_SERVICE,
  ELEMENT_REF,
  ANGULAR_CORE,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const SPLIT_VIEW_COMPONENT_MIGRATION: ConstructorDeprecation = {
  // projects/storefrontlib/src/shared/components/split-view/split/split-view.component.ts
  class: SPLIT_VIEW_COMPONENT,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
    {
      className: SPLIT_VIEW_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
  ],
  addParams: [
    {
      className: BREAKPOINT_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
    {
      className: ELEMENT_REF,
      importPath: ANGULAR_CORE,
    },
  ],
};
