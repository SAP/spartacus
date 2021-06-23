import {
  MULTI_CART_STATE_PERSISTENCE_SERVICE,
  SPARTACUS_CORE,
  TODO_SPARTACUS,
  SYNC,
  INIT_SYNC,
} from '../../../../shared/constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

// projects/core/src/cart/services/multi-cart-state-persistence.service.ts
export const MULTI_CART_STATE_PERSISTENCE_SERVICE_MIGRATION: MethodPropertyDeprecation[] =
  [
    {
      class: MULTI_CART_STATE_PERSISTENCE_SERVICE,
      importPath: SPARTACUS_CORE,
      deprecatedNode: SYNC,
      comment: `// ${TODO_SPARTACUS} Method '${SYNC}' was renamed to ${INIT_SYNC}.`,
    },
  ];
