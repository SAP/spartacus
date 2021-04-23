import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { ConstructorDeprecation } from '../../../shared/utils/file-utils';
import { migrateConstructorDeprecation } from '../../mechanism/constructor-deprecations/constructor-deprecations';
import { BASE_PAGE_META_RESOLVER_MIGRATION } from './data/base-page-meta.resolver.migration';
import {
  CART_PAGE_EVENT_BUILDER_COMPONENT_MIGRATION_V1,
  CART_PAGE_EVENT_BUILDER_COMPONENT_MIGRATION_V2,
} from './data/cart-page-event.builder.migration';
import { CATEGORY_PAGE_META_RESOLVER_MIGRATION } from './data/category-page-meta.resolver.migration';
import { CHECKOUT_PAGE_META_RESOLVER_MIGRATION } from './data/checkout-page-meta.resolver.migration';
import { CONTENT_PAGE_META_RESOLVER_MIGRATION } from './data/content-page-meta.resolver.migration';
import { HOME_PAGE_EVENT_BUILDER_COMPONENT_MIGRATION } from './data/home-page-event.builder.migration';
import { ORGANIZATION_PAGE_META_RESOLVER_MIGRATION } from './data/organization-page-meta.resolver.migration';
import { PAGE_META_SERVICE_MIGRATION } from './data/page-meta.service.migration';
import { PRODUCT_PAGE_EVENT_BUILDER_COMPONENT_MIGRATION } from './data/product-page-event.builder.migration';
import { PRODUCT_PAGE_META_RESOLVER_MIGRATION } from './data/product-page-meta.resolver.migration';
import { ROUTING_SERVICE_MIGRATION } from './data/routing.service.migration';
import { SEARCH_BOX_COMPONENT_SERVICE_MIGRATION } from './data/search-box-component.service.migration';
import { SEARCH_PAGE_META_RESOLVER_MIGRATION } from './data/search-page-meta.resolver.migration';
import { UNIT_CHILDREN_COMPONENT_MIGRATION } from './data/unit-children.component.migration';
import { UNIT_COST_CENTERS_COMPONENT_MIGRATION } from './data/unit-cost-centers.component.migration';
import { UNIT_USER_LIST_COMPONENT_MIGRATION } from './data/unit-user-list.component.migration';

export const CONSTRUCTOR_DEPRECATION_DATA: ConstructorDeprecation[] = [
  UNIT_CHILDREN_COMPONENT_MIGRATION,
  UNIT_COST_CENTERS_COMPONENT_MIGRATION,
  UNIT_USER_LIST_COMPONENT_MIGRATION,
  CART_PAGE_EVENT_BUILDER_COMPONENT_MIGRATION_V1,
  CART_PAGE_EVENT_BUILDER_COMPONENT_MIGRATION_V2,
  HOME_PAGE_EVENT_BUILDER_COMPONENT_MIGRATION,
  PRODUCT_PAGE_EVENT_BUILDER_COMPONENT_MIGRATION,
  SEARCH_BOX_COMPONENT_SERVICE_MIGRATION,
  PAGE_META_SERVICE_MIGRATION,
  BASE_PAGE_META_RESOLVER_MIGRATION,
  CONTENT_PAGE_META_RESOLVER_MIGRATION,
  PRODUCT_PAGE_META_RESOLVER_MIGRATION,
  SEARCH_PAGE_META_RESOLVER_MIGRATION,
  CHECKOUT_PAGE_META_RESOLVER_MIGRATION,
  CATEGORY_PAGE_META_RESOLVER_MIGRATION,
  ORGANIZATION_PAGE_META_RESOLVER_MIGRATION,
  ROUTING_SERVICE_MIGRATION,
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
