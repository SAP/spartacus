import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { ConstructorDeprecation } from '../../../shared/utils/file-utils';
import { migrateConstructorDeprecation } from '../../mechanism/constructor-deprecations/constructor-deprecations';
import { ADD_TO_CART_COMPONENT_MIGRATION } from './data/add-to-cart.component.migration';
import { ASM_AUTH_HTTP_HEADER_SERVICE_MIGRATION } from './data/asm-auth-http-header.service.migration';
import { CART_PAGE_LAYOUT_HANDLER_MIGRATIONS } from './data/cart-page-layout-handler.migration';
import { CHECKOUT_SERVICE_MIGRATION } from './data/checkout.service.migration';
import { CURRENT_PRODUCT_SERVICE_MIGRATION } from './data/current-product-service.migration';
import { DYNAMIC_ATTRIBUTE_SERVICE_MIGRATION } from './data/dynamic-attribute.service.migration';
import { CATEGORY_PAGE_META_RESOLVER_MIGRATION } from './data/page-resolvers/category-page-meta.resolver.migration';
import { CHECKOUT_PAGE_META_RESOLVER_MIGRATION } from './data/page-resolvers/checkout-page-meta.resolver.migration';
import { PAGE_META_SERVICE_MIGRATION } from './data/page-resolvers/page-meta.service.migration';
import { PRODUCT_PAGE_META_RESOLVER_MIGRATION } from './data/page-resolvers/product-page-meta.resolver.migration';
import { PAGE_SLOT_COMPONENT_MIGRATION } from './data/page-slot.component.migration';
import { SELECTIVE_CART_SERVICE_MIGRATION } from './data/selective-cart.service.migration';
import { USER_ADDRESS_SERVICE_MIGRATION } from './data/user-address.service.migration';

export const CONSTRUCTOR_DEPRECATION_DATA: ConstructorDeprecation[] = [
  USER_ADDRESS_SERVICE_MIGRATION,
  PAGE_META_SERVICE_MIGRATION,
  CHECKOUT_SERVICE_MIGRATION,
  PRODUCT_PAGE_META_RESOLVER_MIGRATION,
  CATEGORY_PAGE_META_RESOLVER_MIGRATION,
  CHECKOUT_PAGE_META_RESOLVER_MIGRATION,
  ADD_TO_CART_COMPONENT_MIGRATION,
  ...CART_PAGE_LAYOUT_HANDLER_MIGRATIONS,
  CURRENT_PRODUCT_SERVICE_MIGRATION,
  ...PAGE_SLOT_COMPONENT_MIGRATION,
  DYNAMIC_ATTRIBUTE_SERVICE_MIGRATION,
  SELECTIVE_CART_SERVICE_MIGRATION,
  ASM_AUTH_HTTP_HEADER_SERVICE_MIGRATION,
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
