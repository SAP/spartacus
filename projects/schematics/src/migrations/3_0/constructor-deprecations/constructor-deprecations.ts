import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { ConstructorDeprecation } from '../../../shared/utils/file-utils';
import { migrateConstructorDeprecation } from '../../mechanism/constructor-deprecations/constructor-deprecations';
import { ACTIVE_CART_SERVICE_MIGRATION } from './data/active-cart.service.migration';
import { CART_VOUCHER_SERVICE_MIGRATION } from './data/cart-voucher.service.migration';
import { CHECKOUT_DELIVERY_SERVICE_MIGRATION } from './data/checkout-delivery.service.migration';
import { MERCHANDISING_CAROUSEL_COMPONENT_MIGRATION } from './data/merchandising-carousel.component.migration';
import { ROUTING_SERVICE_MIGRATION } from './data/routing.service.migration';
import { SELECTIVE_CART_SERVICE_MIGRATION } from './data/selective-cart.service.migration';
import { WISH_LIST_SERVICE_MIGRATION } from './data/wish-list.service.migration';

export const CONSTRUCTOR_DEPRECATION_DATA: ConstructorDeprecation[] = [
  ROUTING_SERVICE_MIGRATION,
  ACTIVE_CART_SERVICE_MIGRATION,
  MERCHANDISING_CAROUSEL_COMPONENT_MIGRATION,
  CART_VOUCHER_SERVICE_MIGRATION,
  SELECTIVE_CART_SERVICE_MIGRATION,
  WISH_LIST_SERVICE_MIGRATION,
  CHECKOUT_DELIVERY_SERVICE_MIGRATION,
];

export function migrate(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    return migrateConstructorDeprecation(
      tree,
      context,
      CONSTRUCTOR_DEPRECATION_DATA
    );
  };
}
