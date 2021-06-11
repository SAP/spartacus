import {
  CART_DETAILS_COMPONENT,
  NG_ON_INIT,
  ORDER_PROMOTIONS$,
  SPARTACUS_STOREFRONTLIB,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

export const CART_DETAILS_COMPONENT_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: CART_DETAILS_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedNode: ORDER_PROMOTIONS$,
    comment: `// ${TODO_SPARTACUS} Property '${ORDER_PROMOTIONS$}' was removed. The component may get promotions directly from the cart.`,
  },
  {
    class: CART_DETAILS_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedNode: NG_ON_INIT,
    comment: `// ${TODO_SPARTACUS} Method '${NG_ON_INIT}' was removed. ${CART_DETAILS_COMPONENT} does not implement OnInit anymore`,
  },
];
