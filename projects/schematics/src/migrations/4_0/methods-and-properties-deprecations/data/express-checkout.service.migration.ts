import {
  CLEAR_CHECKOUT_SERVICE,
  EXPRESS_CHECKOUT_SERVICE,
  RESET_CHECKOUT_PROCESSES,
  SPARTACUS_CHECKOUT_CORE,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

export const EXPRESS_CHECKOUT_SERVICE_MIGRATION: MethodPropertyDeprecation[] = [
  // feature-libs/checkout/components/services/express-checkout.service.ts
  {
    class: EXPRESS_CHECKOUT_SERVICE,
    importPath: SPARTACUS_CHECKOUT_CORE,
    deprecatedNode: RESET_CHECKOUT_PROCESSES,
    comment: `// ${TODO_SPARTACUS} Method '${RESET_CHECKOUT_PROCESSES}' was removed, use '${CLEAR_CHECKOUT_SERVICE}' method instead`,
  },
];
