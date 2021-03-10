import {
  CHECKOUT_CONNECTOR,
  PLACE_ORDER,
  SPARTACUS_CORE,
  TODO_SPARTACUS,
} from '../../../../shared';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

export const CHECKOUT_CONNECTOR_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: CHECKOUT_CONNECTOR,
    importPath: SPARTACUS_CORE,
    deprecatedNode: PLACE_ORDER,
    comment: `//${TODO_SPARTACUS} please add the 'termsChecked' parameter to your parameters for method ${PLACE_ORDER}`,
  },
];
