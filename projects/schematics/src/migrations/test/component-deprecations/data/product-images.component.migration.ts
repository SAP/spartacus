import { PRODUCT_IMAGES_COMPONENT } from '../../../../shared/constants';
import { ComponentData } from '../../../../shared/utils/file-utils';

export const PRODUCT_IMAGES_COMPONENT_MIGRATION: ComponentData = {
  selector: 'cx-product-images',
  componentClassName: PRODUCT_IMAGES_COMPONENT,
  removedProperties: [
    {
      name: 'isThumbsEmpty',
      comment: `'isThumbsEmpty' property has been removed.`,
    },
  ],
};
