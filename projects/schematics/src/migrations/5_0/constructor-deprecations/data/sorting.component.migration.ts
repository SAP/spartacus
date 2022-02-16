import {
  ELEMENT_REF,
  SPARTACUS_CORE,
  SORTING_COMPONENT,
  ANGULAR_CORE,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const SORTING_COMPONENT_MIGRATION: ConstructorDeprecation = {
  // projects/storefrontlib/shared/components/list-navigation/sorting/sorting.component.ts
  class: SORTING_COMPONENT,
  importPath: SPARTACUS_CORE,
  deprecatedParams: [],
  addParams: [{ className: ELEMENT_REF, importPath: ANGULAR_CORE }],
};
