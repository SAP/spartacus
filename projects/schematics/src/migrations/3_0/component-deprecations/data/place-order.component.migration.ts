import { PLACE_ORDER_COMPONENT } from '../../../../shared/constants';
import { ComponentData } from '../../../../shared/utils/file-utils';

export const PLACE_ORDER_COMPONENT_MIGRATION: ComponentData = {
  // projects/storefrontlib/cms-components/checkout/components/place-order/place-order.component.ts
  selector: 'cx-place-order',
  componentClassName: PLACE_ORDER_COMPONENT,
  removedProperties: [
    {
      name: 'placeOrderSubscription',
      comment: `'placeOrderSubscription' property was removed and replaced`,
    },
  ],
};
