import {
  ADD_TO_CART_COMPONENT,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { ComponentData } from '../../../../shared/utils/file-utils';

export const ADD_TO_CART_COMPONENT_MIGRATION: ComponentData = {
  selector: 'cx-add-to-cart',
  componentClassName: ADD_TO_CART_COMPONENT,
  removedProperties: [
    {
      name: 'increment',
      comment: `${TODO_SPARTACUS} 'increment' property was removed. Use new 'numberOfEntriesBeforeAdd' instead.`,
    },
    {
      name: 'cartEntry$',
      comment: `${TODO_SPARTACUS} 'cartEntry$' property was removed. Use 'activeCartService.getLastEntry(productCode)' instead.`,
    },
  ],
};
