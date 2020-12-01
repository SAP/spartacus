import {
  PLACE_ORDER_COMPONENT,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { ComponentData } from '../../../../shared/utils/file-utils';

export const PLACE_ORDER_COMPONENT_MIGRATION: ComponentData = {
  // projects/storefrontlib/src/cms-components/checkout/components/place-order/place-order.component.ts
  selector: 'cx-place-order',
  componentClassName: PLACE_ORDER_COMPONENT,
  removedProperties: [
    {
      name: 'placeOrderSubscription',
      comment: `${TODO_SPARTACUS} 'placeOrderSubscription' property was removed and replaced`,
    },
  ],
};
