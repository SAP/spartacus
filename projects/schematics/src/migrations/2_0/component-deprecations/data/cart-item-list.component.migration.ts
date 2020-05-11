import { CART_ITEM_LIST_COMPONENT } from '../../../../shared/constants';
import { ComponentData } from '../../../../shared/utils/file-utils';

export const CART_ITEM_LIST_COMPONENT_MIGRATION: ComponentData = {
  selector: 'cx-cart-item-list',
  componentClassName: CART_ITEM_LIST_COMPONENT,
  removedProperties: [
    {
      name: 'isSaveForLaterEnabled',
      comment: `'isSaveForLaterEnabled' method has been removed.`,
    },
  ],
};
