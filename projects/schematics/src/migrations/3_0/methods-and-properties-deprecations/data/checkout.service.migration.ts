import {
  CHECKOUT_SERVICE,
  PLACE_ORDER,
  SPARTACUS_CORE,
  TODO_SPARTACUS,
} from '../../../../shared';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

export const CHECKOUT_SERVICE_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: CHECKOUT_SERVICE,
    importPath: SPARTACUS_CORE,
    deprecatedNode: PLACE_ORDER,
    comment: `//${TODO_SPARTACUS} please add 'termsChecked' parameter to your parameters for method ${PLACE_ORDER}`,
  },
];
