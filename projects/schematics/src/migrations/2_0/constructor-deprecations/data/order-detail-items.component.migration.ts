import {
  ORDER_DETAIL_ITEMS_COMPONENT,
  SPARTACUS_CORE,
  PROMOTION_SERVICE,
  SPARTACUS_STOREFRONTLIB,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';
// projects/storefrontlib/src/cms-components/myaccount/order/order-details/order-detail-items/order-detail-items.component.ts
export const   ORDER_DETAIL_ITEMS_COMPONENT_MIGRATION: ConstructorDeprecation = {
  class: ORDER_DETAIL_ITEMS_COMPONENT,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [],
  removeParams: [],
  addParams: [
    {
      className: PROMOTION_SERVICE,
      importPath: SPARTACUS_CORE,
    }
  ],
};
