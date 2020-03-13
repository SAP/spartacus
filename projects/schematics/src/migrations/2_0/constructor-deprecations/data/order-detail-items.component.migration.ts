import {
  ORDER_DETAILS_SERVICE,
  ORDER_DETAIL_ITEMS_COMPONENT,
  PROMOTION_SERVICE,
  SPARTACUS_STOREFRONTLIB,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';
// projects/storefrontlib/src/cms-components/myaccount/order/order-details/order-detail-items/order-detail-items.component.ts
export const ORDER_DETAIL_ITEMS_COMPONENT_MIGRATION: ConstructorDeprecation = {
  class: ORDER_DETAIL_ITEMS_COMPONENT,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
    {
      className: ORDER_DETAILS_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
  ],
  addParams: [
    {
      className: PROMOTION_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
  ],
};
