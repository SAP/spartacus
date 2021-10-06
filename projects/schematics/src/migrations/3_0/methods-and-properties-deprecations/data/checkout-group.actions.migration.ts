import {
  CHECKOUT_ACTIONS,
  PLACE_ORDER_CLASS,
  SPARTACUS_CORE,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

// projects/core/src/checkout/store/actions/index.ts
export const CHECKOUT_GROUP_ACTIONS_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: CHECKOUT_ACTIONS,
    importPath: SPARTACUS_CORE,
    deprecatedNode: PLACE_ORDER_CLASS,
    comment: `// ${TODO_SPARTACUS} please add the 'termsChecked' field to your payload object parameter for '${PLACE_ORDER_CLASS}' actions`,
  },
];
