import {
  CLEAR_CHECKOUT_FACADE,
  EXPRESS_CHECKOUT_SERVICE,
  RESET_CHECKOUT_PROCESSES,
  SPARTACUS_CHECKOUT_COMPONENTS,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

export const EXPRESS_CHECKOUT_SERVICE_MIGRATION: MethodPropertyDeprecation[] = [
  // feature-libs/checkout/components/services/express-checkout.service.ts
  {
    class: EXPRESS_CHECKOUT_SERVICE,
    importPath: SPARTACUS_CHECKOUT_COMPONENTS,
    deprecatedNode: RESET_CHECKOUT_PROCESSES,
    comment: `// ${TODO_SPARTACUS} Method '${EXPRESS_CHECKOUT_SERVICE}.${RESET_CHECKOUT_PROCESSES}' was removed, use method '${RESET_CHECKOUT_PROCESSES}' from '${CLEAR_CHECKOUT_FACADE}' instead`,
  },
];
