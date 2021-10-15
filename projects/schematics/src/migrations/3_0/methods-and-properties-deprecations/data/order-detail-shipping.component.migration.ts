import {
  GET_ADDRESS_CARD_CONTENT,
  GET_DELIVERY_MODE_CARD_CONTENT,
  GET_PAYMENT_CARD_CONTENT,
  GET_SHIPPING_METHOD_CARD_CONTENT,
  ORDER_DETAIL_SHIPPING_COMPONENT,
  SPARTACUS_STOREFRONTLIB,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

//projects/storefrontlib/cms-components/myaccount/order/order-details/order-detail-shipping/order-detail-shipping.component.ts;
export const ORDER_DETAIL_SHIPPING_COMPONENT_MIGRATION: MethodPropertyDeprecation[] =
  [
    {
      class: ORDER_DETAIL_SHIPPING_COMPONENT,
      importPath: SPARTACUS_STOREFRONTLIB,
      deprecatedNode: GET_ADDRESS_CARD_CONTENT,
      comment: `// ${TODO_SPARTACUS} Method '${GET_ADDRESS_CARD_CONTENT}' was removed from '${ORDER_DETAIL_SHIPPING_COMPONENT}'.`,
    },
    {
      class: ORDER_DETAIL_SHIPPING_COMPONENT,
      importPath: SPARTACUS_STOREFRONTLIB,
      deprecatedNode: GET_DELIVERY_MODE_CARD_CONTENT,
      comment: `// ${TODO_SPARTACUS} Method '${GET_DELIVERY_MODE_CARD_CONTENT}' was removed from '${ORDER_DETAIL_SHIPPING_COMPONENT}'.`,
    },
    {
      class: ORDER_DETAIL_SHIPPING_COMPONENT,
      importPath: SPARTACUS_STOREFRONTLIB,
      deprecatedNode: GET_PAYMENT_CARD_CONTENT,
      comment: `// ${TODO_SPARTACUS} Method '${GET_PAYMENT_CARD_CONTENT}' was removed from '${ORDER_DETAIL_SHIPPING_COMPONENT}'.`,
    },
    {
      class: ORDER_DETAIL_SHIPPING_COMPONENT,
      importPath: SPARTACUS_STOREFRONTLIB,
      deprecatedNode: GET_SHIPPING_METHOD_CARD_CONTENT,
      comment: `// ${TODO_SPARTACUS} Method '${GET_SHIPPING_METHOD_CARD_CONTENT}' was removed from '${ORDER_DETAIL_SHIPPING_COMPONENT}'.`,
    },
  ];
