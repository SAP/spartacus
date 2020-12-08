import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { ComponentData } from '../../../shared/utils/file-utils';
import { migrateComponentMigration } from '../../mechanism/component-deprecations/component-deprecations';
import { ADD_TO_CART_COMPONENT_MIGRATION } from './data/added-to-cart-dialog.component.migration';
import { CART_ITEM_COMPONENT_MIGRATION } from './data/cart-item.component.migration';
import { CHECKOUT_PROGRESS_MOBILE_BOTTOM_COMPONENT_MIGRATION } from './data/checkout-progress-mobile-bottom.component.migration';
import { CHECKOUT_PROGRESS_MOBILE_TOP_COMPONENT_MIGRATION } from './data/checkout-progress-mobile-top.component.migration';
import { CHECKOUT_PROGRESS_COMPONENT_MIGRATION } from './data/checkout-progress.component.migration';
import { CLOSE_ACCOUNT_MODAL_COMPONENT_MIGRATION } from './data/close-account-modal.component.migration';
import { DELIVERY_MODE_COMPONENT_MIGRATION } from './data/delivery-mode.component.migration';
import { ORDER_DETAIL_SHIPPING_COMPONENT_MIGRATION } from './data/order-detail-shipping.component.migration';
import { PAYMENT_METHOD_COMPONENT_MIGRATION } from './data/payment-method.component.migration';
import { PLACE_ORDER_COMPONENT_MIGRATION } from './data/place-order.component.migration';
import { SHIPPING_ADDRESS_COMPONENT_MIGRATION } from './data/shipping-address.component.migration';
import { STAR_RATING_COMPONENT_MIGRATION } from './data/star-rating.component.migration';

export const COMPONENT_DEPRECATION_DATA: ComponentData[] = [
  CHECKOUT_PROGRESS_MOBILE_BOTTOM_COMPONENT_MIGRATION,
  CHECKOUT_PROGRESS_MOBILE_TOP_COMPONENT_MIGRATION,
  CHECKOUT_PROGRESS_COMPONENT_MIGRATION,
  DELIVERY_MODE_COMPONENT_MIGRATION,
  PAYMENT_METHOD_COMPONENT_MIGRATION,
  SHIPPING_ADDRESS_COMPONENT_MIGRATION,
  ORDER_DETAIL_SHIPPING_COMPONENT_MIGRATION,
  PLACE_ORDER_COMPONENT_MIGRATION,
  ADD_TO_CART_COMPONENT_MIGRATION,
  CART_ITEM_COMPONENT_MIGRATION,
  CLOSE_ACCOUNT_MODAL_COMPONENT_MIGRATION,
  STAR_RATING_COMPONENT_MIGRATION,
];

export function migrate(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    return migrateComponentMigration(tree, context, COMPONENT_DEPRECATION_DATA);
  };
}
