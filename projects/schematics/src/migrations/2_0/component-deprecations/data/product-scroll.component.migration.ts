import { PRODUCT_SCROLL_COMPONENT } from '../../../../shared/constants';
import { ComponentData } from '../../../../shared/utils/file-utils';

export const PRODUCT_SCROLL_COMPONENT_MIGRATION: ComponentData = {
  selector: 'cx-product-scroll',
  componentClassName: PRODUCT_SCROLL_COMPONENT,
  removedProperties: [
    {
      name: 'isSamePage',
      comment: `'isSamePage' method has been removed.`,
    },
  ],
};
