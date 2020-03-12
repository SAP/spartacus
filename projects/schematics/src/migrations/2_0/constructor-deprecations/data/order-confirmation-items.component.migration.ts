import {
  ORDER_CONFIRMATION_ITEMS_COMPONENT,
  SPARTACUS_CORE,
  PROMOTION_SERVICE,
  SPARTACUS_STOREFRONTLIB,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';
// projects/storefrontlib/src/cms-components/order-confirmation/components/order-confirmation-items/order-confirmation-items.component.ts
export const ORDER_CONFIRMATION_ITEMS_COMPONENT_MIGRATION: ConstructorDeprecation = {
  class: ORDER_CONFIRMATION_ITEMS_COMPONENT,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [],
  removeParams: [],
  addParams: [
    {
      className: PROMOTION_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
};
