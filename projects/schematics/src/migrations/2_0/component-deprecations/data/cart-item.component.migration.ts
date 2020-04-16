import { CART_ITEM_COMPONENT } from '../../../../shared/constants';
import { ComponentData } from '../../../../shared/utils/file-utils';

export const CART_ITEM_COMPONENT_MIGRATION: ComponentData = {
  selector: 'cx-cart-item',
  componentClassName: CART_ITEM_COMPONENT,
  removedProperties: [
    {
      name: 'isSaveForLaterEnabled',
      comment: `'isSaveForLaterEnabled' method has been removed.`,
    },
  ],
};
