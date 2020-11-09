import { ADDED_TO_CART_DIALOG_COMPONENT } from '../../../../shared/constants';
import { ComponentData } from '../../../../shared/utils/file-utils';

export const ADDED_TO_CART_DIALOG_COMPONENT_MIGRATION: ComponentData = {
  selector: 'cx-added-to-cart-dialog',
  componentClassName: ADDED_TO_CART_DIALOG_COMPONENT,
  removedProperties: [
    {
      name: 'increment',
      comment: `'increment' property was removed. Use new 'numberOfEntriesBeforeAdd' instead.`,
    },
    {
      name: 'cartEntry$',
      comment: `'cartEntry$' property was removed. Use 'activeCartService.getLastEntry(productCode)' instead.`,
    },
  ],
};
