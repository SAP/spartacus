import {
  GET_LOADED,
  IS_STABLE,
  SELECTIVE_CART_SERVICE,
  SPARTACUS_CORE,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

// projects/core/src/cart/facade/selective-cart.service.ts
export const SELECTIVE_CART_SERVICE_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: SELECTIVE_CART_SERVICE,
    importPath: SPARTACUS_CORE,
    deprecatedNode: GET_LOADED,
    comment: `// ${TODO_SPARTACUS} Method '${SELECTIVE_CART_SERVICE}.${GET_LOADED}' was removed, use '${IS_STABLE}' method instead`,
  },
];
