import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';
import {
  QUICK_ORDER_SERVICE,
  REMOVE_ENTRY,
  SEARCH,
  SPARTACUS_CART_QUICK_ORDER_CORE,
  TODO_SPARTACUS,
} from '../../../../shared/constants';

export const QUICK_ORDER_SERVICE_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: QUICK_ORDER_SERVICE,
    importPath: SPARTACUS_CART_QUICK_ORDER_CORE,
    deprecatedNode: SEARCH,
    comment: `// ${TODO_SPARTACUS} Method '${QUICK_ORDER_SERVICE}.${SEARCH}' was removed. Use 'searchProducts' instead.`,
  },
  {
    class: QUICK_ORDER_SERVICE,
    importPath: SPARTACUS_CART_QUICK_ORDER_CORE,
    deprecatedNode: REMOVE_ENTRY,
    comment: `// ${TODO_SPARTACUS} Method '${QUICK_ORDER_SERVICE}.${REMOVE_ENTRY}' was removed. Use 'softDeleteEntry' instead.`,
  },
];
