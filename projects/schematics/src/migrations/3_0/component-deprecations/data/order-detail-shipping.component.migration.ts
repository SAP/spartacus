import { ComponentData } from '../../../../shared/utils/file-utils';

export const ORDER_DETAILS_SHIPPING_COMPONENT_MIGRATION: ComponentData = {
  // projects/storefrontlib/src/cms-components/myaccount/order/order-details/order-detail-shipping/order-detail-shipping.component.ts
  selector: 'cx-order-details-shipping',
  componentClassName: 'ORDER_DETAIL_SHIPPING_COMPONENT',
  removedProperties: [
    {
      name: 'getPaymentCardContent',
      comment: `'getPaymentCardContent' was renamed to 'getPaymentInfoCardContent'.`,
    },
    {
      name: 'getShippingMethodCardContent',
      comment: `'getShippingMethodCardContent' was removed, use 'getDeliveryModeCardContent' instead.`,
    },
  ],
};
