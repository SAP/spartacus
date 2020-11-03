import {
  CHECKOUT_ACTIONS,
  PLACE_ORDER_ACTION,
  SPARTACUS_CORE,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

export const CHECKOUT_GROUP_ACTIONS_MIGRATIONS: MethodPropertyDeprecation[] = [
  {
    class: CHECKOUT_ACTIONS,
    importPath: SPARTACUS_CORE,
    deprecatedNode: PLACE_ORDER_ACTION,
    comment: `// ${TODO_SPARTACUS} please add the 'termsChecked' field to your payload object parameter for '${PLACE_ORDER_ACTION}' actions`,
  },
];
