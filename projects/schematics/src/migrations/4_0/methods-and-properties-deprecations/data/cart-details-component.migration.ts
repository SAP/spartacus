import {
  CART_DETAILS_COMPONENT,
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
    comment: `// ${TODO_SPARTACUS} Property '${CART_DETAILS_COMPONENT}.${ORDER_PROMOTIONS$}' was removed. The component may get promotions directly from the cart.`,
  },
];
