import {
  CAN_ACTIVATE,
  CHECKOUT_AUTH_GUARD,
  SPARTACUS_STOREFRONTLIB,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

// projects/storefrontlib/cms-components/checkout/guards/checkout-auth.guard.ts
export const CHECKOUT_AUTH_GUARD_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: CHECKOUT_AUTH_GUARD,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedNode: CAN_ACTIVATE,
    newNode: CAN_ACTIVATE,
    comment: `// ${TODO_SPARTACUS} Method '${CAN_ACTIVATE}' now returns type 'Observable<boolean | UrlTree>'.`,
  },
];
