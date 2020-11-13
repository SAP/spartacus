import {
  CHECKOUT_ADAPTER,
  PLACE_ORDER,
  SPARTACUS_CORE,
  TODO_SPARTACUS,
} from '../../../../shared';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

//projects/core/src/checkout/connectors/checkout/checkout.adapter.ts
export const CHECKOUT_ADAPTER_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: CHECKOUT_ADAPTER,
    importPath: SPARTACUS_CORE,
    deprecatedNode: PLACE_ORDER,
    comment: `//${TODO_SPARTACUS} please add the 'termsChecked' parameter to your parameters for method ${PLACE_ORDER}`,
  },
];
