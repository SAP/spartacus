import { ComponentData } from '../../../shared/utils/file-utils';
import { CONSENT_MANAGEMENT_FORM_COMPONENT_MIGRATION } from './data/consent-management-form.component.migration';
import { PRODUCT_IMAGES_COMPONENT_MIGRATION } from './data/product-images.component.migration';
import { CART_DETAILS_COMPONENT_MIGRATION } from './data/cart-details.component.migration';
import { CART_ITEM_LIST_COMPONENT_MIGRATION } from './data/cart-item-list.component.migration';
import { CART_ITEM_COMPONENT_MIGRATION } from './data/cart-item.component.migration';

export const COMPONENT_DEPRECATION_DATA: ComponentData[] = [
  CONSENT_MANAGEMENT_FORM_COMPONENT_MIGRATION,
  PRODUCT_IMAGES_COMPONENT_MIGRATION,
  CART_DETAILS_COMPONENT_MIGRATION,
  CART_ITEM_LIST_COMPONENT_MIGRATION,
  CART_ITEM_COMPONENT_MIGRATION,
];
