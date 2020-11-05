import { CART_ITEM_COMPONENT } from '../../../../shared/constants';
import { ComponentData } from '../../../../shared/utils/file-utils';

export const CART_ITEM_COMPONENT_MIGRATION: ComponentData = {
  selector: 'cx-cart-item',
  componentClassName: CART_ITEM_COMPONENT,
  removedProperties: [
    {
      name: 'view',
      comment: `'view' output was removed. Instead use '[cxModal]' directive to close modal on link click.`,
    },
    {
      name: 'viewItem',
      comment: `'viewItem' method was removed. Instead use '[cxModal]' directive to close modal on link click.`,
    },
  ],
};
