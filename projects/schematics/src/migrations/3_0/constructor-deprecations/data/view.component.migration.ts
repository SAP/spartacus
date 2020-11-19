import {
  SPARTACUS_STOREFRONTLIB,
  SPARTACUS_CORE,
  VIEW_COMPONENT,
  ELEMENT_REF,
  CHANGE_DETECTOR_REF,
  SPLIT_VIEW_SERVICE,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const VIEW_COMPONENT_MIGRATION: ConstructorDeprecation = {
  // projects/storefrontlib/src/shared/components/split-view/view/view.component.ts
  class: VIEW_COMPONENT,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
    {
      className: SPLIT_VIEW_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
    {
      className: ELEMENT_REF,
      importPath: SPARTACUS_CORE,
    },
  ],
  addParams: [
    {
      className: CHANGE_DETECTOR_REF,
      importPath: SPARTACUS_CORE,
    },
  ],
};
