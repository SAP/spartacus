import { ORDER_DETAIL_SHIPPING_COMPONENT } from '../../../../shared/constants';
import { ComponentData } from '../../../../shared/utils/file-utils';

export const ORDER_DETAIL_SHIPPING_COMPONENT_MIGRATION: ComponentData = {
  // projects/storefrontlib/cms-components/myaccount/order/order-details/order-detail-shipping/order-detail-shipping.component.ts
  selector: 'cx-order-details-shipping',
  componentClassName: ORDER_DETAIL_SHIPPING_COMPONENT,
  removedProperties: [
    {
      name: 'order$',
      comment: `'order$' property return type was changed from 'Observable<Order>' to 'Observable<any>'`,
    },
    {
      name: 'getPaymentCardContent',
      comment: `'getPaymentCardContent' was removed, please check the 'OrderOverviewComponent' instead.`,
    },
    {
      name: 'getShippingMethodCardContent',
      comment: `'getShippingMethodCardContent' was removed, please check the 'OrderOverviewComponent' instead.`,
    },
    {
      name: 'getAddressCardContent',
      comment: `'getAddressCardContent' was removed, please check the 'OrderOverviewComponent' instead.`,
    },
    {
      name: 'getBillingAddressCardContent',
      comment: `'getBillingAddressCardContent' was removed, please check the 'OrderOverviewComponent' instead.`,
    },
  ],
};
