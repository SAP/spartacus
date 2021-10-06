import { ADD_TO_CART_COMPONENT } from '../../../../shared/constants';
import { ComponentData } from '../../../../shared/utils/file-utils';

export const ADD_TO_CART_COMPONENT_MIGRATION: ComponentData = {
  selector: 'cx-add-to-cart',
  componentClassName: ADD_TO_CART_COMPONENT,
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
