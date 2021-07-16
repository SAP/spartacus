import {
  CART_DETAILS_COMPONENT,
  CART_ITEM_COMPONENT,
  NG_ON_INIT,
  SPARTACUS_STOREFRONTLIB,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

export const CART_ITEM_COMPONENT_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: CART_ITEM_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedNode: NG_ON_INIT,
    comment: `// ${TODO_SPARTACUS} Method '${CART_ITEM_COMPONENT}.${NG_ON_INIT}' was removed. ${CART_DETAILS_COMPONENT} does not implement OnInit anymore`,
  },
];
