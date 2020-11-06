import {
  STOREFRONT_COMPONENT,
  COLLAPSE_MENU_IF_CLICK_OUTSIDE,
  SPARTACUS_STOREFRONTLIB,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

// projects/storefrontlib/src/layout/main/storefront.component.ts
export const STOREFRONT_COMPONENT_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: STOREFRONT_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedNode: COLLAPSE_MENU_IF_CLICK_OUTSIDE,
    newNode: COLLAPSE_MENU_IF_CLICK_OUTSIDE,
    comment: `// ${TODO_SPARTACUS} Method '${COLLAPSE_MENU_IF_CLICK_OUTSIDE}' changed method param type from 'MouseEvent' to 'any'`,
  },
];
