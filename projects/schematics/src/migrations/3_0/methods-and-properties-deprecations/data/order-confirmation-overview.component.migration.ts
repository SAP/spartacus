import {
  GET_ADDRESS_CARD_CONTENT,
  GET_BILLING_ADDRESS_CARD_CONTENT,
  GET_DELIVERY_MODE_CARD_CONTENT,
  GET_PAYMENT_INFO_CARD_CONTENT,
  ORDER_CONFIRMATION_OVERVIEW_COMPONENT,
  SPARTACUS_STOREFRONTLIB,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

//projects/storefrontlib/cms-components/order-confirmation/components/order-confirmation-overview/order-confirmation-overview.component.ts;
export const ORDER_CONFIRMATION_OVERVIEW_COMPONENT_MIGRATION: MethodPropertyDeprecation[] =
  [
    {
      class: ORDER_CONFIRMATION_OVERVIEW_COMPONENT,
      importPath: SPARTACUS_STOREFRONTLIB,
      deprecatedNode: GET_ADDRESS_CARD_CONTENT,
      comment: `// ${TODO_SPARTACUS} Method '${GET_ADDRESS_CARD_CONTENT}' was removed from '${ORDER_CONFIRMATION_OVERVIEW_COMPONENT}'.`,
    },
    {
      class: ORDER_CONFIRMATION_OVERVIEW_COMPONENT,
      importPath: SPARTACUS_STOREFRONTLIB,
      deprecatedNode: GET_DELIVERY_MODE_CARD_CONTENT,
      comment: `// ${TODO_SPARTACUS} Method '${GET_DELIVERY_MODE_CARD_CONTENT}' was removed from '${ORDER_CONFIRMATION_OVERVIEW_COMPONENT}'.`,
    },
    {
      class: ORDER_CONFIRMATION_OVERVIEW_COMPONENT,
      importPath: SPARTACUS_STOREFRONTLIB,
      deprecatedNode: GET_PAYMENT_INFO_CARD_CONTENT,
      comment: `// ${TODO_SPARTACUS} Method '${GET_PAYMENT_INFO_CARD_CONTENT}' was removed from '${ORDER_CONFIRMATION_OVERVIEW_COMPONENT}'.`,
    },
    {
      class: ORDER_CONFIRMATION_OVERVIEW_COMPONENT,
      importPath: SPARTACUS_STOREFRONTLIB,
      deprecatedNode: GET_BILLING_ADDRESS_CARD_CONTENT,
      comment: `// ${TODO_SPARTACUS} Method '${GET_BILLING_ADDRESS_CARD_CONTENT}' was removed from '${ORDER_CONFIRMATION_OVERVIEW_COMPONENT}'.`,
    },
  ];
