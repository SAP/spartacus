import {
  CAN_ACTIVATE,
  CART_NOT_EMPTY_GUARD,
  SPARTACUS_STOREFRONTLIB,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

// projects/storefrontlib/cms-components/cart/cart-not-empty.guard.ts
export const CART_NOT_EMPTY_GUARD_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: CART_NOT_EMPTY_GUARD,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedNode: CAN_ACTIVATE,
    newNode: CAN_ACTIVATE,
    comment: `// ${TODO_SPARTACUS} Method '${CAN_ACTIVATE}' return type has changed from 'Observable<boolean>' to 'Observable<boolean | UrlTree>'.`,
  },
];
