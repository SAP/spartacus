import {
  ORDER_DETAIL_SHIPPING_COMPONENT,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { ComponentData } from '../../../../shared/utils/file-utils';

export const ORDER_DETAIL_SHIPPING_COMPONENT_MIGRATION: ComponentData = {
  // projects/storefrontlib/src/cms-components/myaccount/order/order-details/order-detail-shipping/order-detail-shipping.component.ts
  selector: 'cx-order-details-shipping',
  componentClassName: ORDER_DETAIL_SHIPPING_COMPONENT,
  removedProperties: [
    {
      name: 'order$',
      comment: `${TODO_SPARTACUS} 'order$' property return type was changed from 'Observable<Order>' to 'Observable<any>'`,
    },
    {
      name: 'getPaymentCardContent',
      comment: `${TODO_SPARTACUS} 'getPaymentCardContent' was removed, please check the 'OrderOverviewComponent' instead.`,
    },
    {
      name: 'getShippingMethodCardContent',
      comment: `${TODO_SPARTACUS} 'getShippingMethodCardContent' was removed, please check the 'OrderOverviewComponent' instead.`,
    },
    {
      name: 'getAddressCardContent',
      comment: `${TODO_SPARTACUS} 'getAddressCardContent' was removed, please check the 'OrderOverviewComponent' instead.`,
    },
    {
      name: 'getBillingAddressCardContent',
      comment: `${TODO_SPARTACUS} 'getBillingAddressCardContent' was removed, please check the 'OrderOverviewComponent' instead.`,
    },
  ],
};
