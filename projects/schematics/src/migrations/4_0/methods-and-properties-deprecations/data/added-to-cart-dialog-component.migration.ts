import {
  ADDED_TO_CART_DIALOG_COMPONENT,
  SPARTACUS_STOREFRONTLIB,
  TODO_SPARTACUS,
  INCREMENT,
} from '../../../../shared/constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

export const ADDED_TO_CART_DIALOG_COMPONENT_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: ADDED_TO_CART_DIALOG_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedNode: INCREMENT,
    comment: `// ${TODO_SPARTACUS} Property '${INCREMENT}' was removed. Please set 'numberOfEntriesBeforeAdd' property instead`,
  },
];
