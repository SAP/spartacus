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
  return async (): Promise<Rule> => {
    // TODO: check if we need a similar workaround as in Angular repo:
    // See https://github.com/angular/angular/commit/c008e0fa90950fd265a699b44f8e596d6511dac2#diff-6a18709758d7c52328001e67eee0c4690888699fb2949f0fc14c2ee75561e91bR48-R58
    const angularCompiler = await import('@angular/compiler');

    return (tree: Tree, context: SchematicContext): Tree => {
      return migrateComponentMigration(
        tree,
        context,
        COMPONENT_DEPRECATION_DATA,
        angularCompiler
      );
    };
  };
}
