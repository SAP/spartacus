import {
  ORDER_DETAILS_SERVICE,
  ORDER_DETAIL_SHIPPING_COMPONENT,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
  TRANSLATION_SERVICE,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const ORDER_DETAIL_SHIPPING_COMPONENT_MIGRATION: ConstructorDeprecation =
  {
    // projects/storefrontlib/cms-components/myaccount/order/order-details/order-detail-shipping/order-detail-shipping.component.ts
    class: ORDER_DETAIL_SHIPPING_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
      { className: ORDER_DETAILS_SERVICE, importPath: SPARTACUS_STOREFRONTLIB },
      { className: TRANSLATION_SERVICE, importPath: SPARTACUS_CORE },
    ],
    removeParams: [
      { className: TRANSLATION_SERVICE, importPath: SPARTACUS_CORE },
    ],
  };
