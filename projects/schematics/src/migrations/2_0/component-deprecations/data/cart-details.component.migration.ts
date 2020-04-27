import { CART_DETAILS_COMPONENT } from '../../../../shared/constants';
import { ComponentData } from '../../../../shared/utils/file-utils';

export const CART_DETAILS_COMPONENT_MIGRATION: ComponentData = {
  selector: 'cx-cart-details',
  componentClassName: CART_DETAILS_COMPONENT,
  removedProperties: [
    {
      name: 'isSaveForLaterEnabled',
      comment: `'isSaveForLaterEnabled' method has been removed.`,
    },
  ],
};
