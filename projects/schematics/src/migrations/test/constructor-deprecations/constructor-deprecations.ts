import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { ConstructorDeprecation } from '../../../shared/utils/file-utils';
import { migrateConstructorDeprecation } from '../../mechanism/constructor-deprecations/constructor-deprecations';
import { ADD_TO_CART_COMPONENT_MIGRATION } from './data/add-to-cart.component.migration';
import { CART_PAGE_LAYOUT_HANDLER_MIGRATIONS } from './data/cart-page-layout-handler.migration';
import { CHECKOUT_SERVICE_MIGRATION } from './data/checkout.service.migration';
import { CURRENT_PRODUCT_SERVICE_MIGRATION } from './data/current-product-service.migration';
import { DYNAMIC_ATTRIBUTE_SERVICE_MIGRATION } from './data/dynamic-attribute.service.migration';
import { FOOTER_NAVIGATION_COMPONENT_MIGRATION } from './data/footer-navigation.component.migration';
import { LOGIN_FORM_COMPONENT_MIGRATION } from './data/login-form.component.migration';
import { MINI_CART_COMPONENT_MIGRATION } from './data/mini-cart.component.migration';
import { OCC_CART_ENTRY_ADAPTER_MIGRATION } from './data/occ-cart-entry.adapter.migration';
import { OCC_CART_ADAPTER_MIGRATION } from './data/occ-cart.adapter.migration';
import { OCC_USER_ORDER_ADAPTER_MIGRATION } from './data/occ-user-order.adapter.migration';
import { CATEGORY_PAGE_META_RESOLVER_MIGRATION } from './data/page-resolvers/category-page-meta.resolver.migration';
import { CHECKOUT_PAGE_META_RESOLVER_MIGRATION } from './data/page-resolvers/checkout-page-meta.resolver.migration';
import { PAGE_META_SERVICE_MIGRATION } from './data/page-resolvers/page-meta.service.migration';
import { PRODUCT_PAGE_META_RESOLVER_MIGRATION } from './data/page-resolvers/product-page-meta.resolver.migration';
import { PAGE_SLOT_COMPONENT_MIGRATION } from './data/page-slot.component.migration';
import { PRODUCT_FACET_NAVIGATION_COMPONENT_MIGRATION } from './data/product-facet-navigation-component.migration';
import { PRODUCT_LIST_COMPONENT_MIGRATION } from './data/product-list.component.migration';
import { PRODUCT_REVIEWS_COMPONENT_MIGRATION } from './data/product-reviews.component.migration';
import { PRODUCT_SERVICE_MIGRATION } from './data/product-service.migration';
import { PROMOTION_SERVICE_MIGRATION } from './data/promotion.service.migration';
import { REVIEW_SUBMIT_COMPONENT_MIGRATIONS } from './data/review-submit.component.migration';
import { SEARCH_BOX_COMPONENT_MIGRATION } from './data/search-box.component.migration';
import { SELECTIVE_CART_SERVICE_MIGRATION } from './data/selective-cart.service.migration';
import { SHIPPING_ADDRESS_COMPONENT_MIGRATION } from './data/shipping-address.component.migration';
import { SKIP_LINK_SERVICE_MIGRATION } from './data/skip-link-service.migration';
import { CDS_SPARTACUS_EVENT_SERVICE_MIGRATION } from './data/spartacus-event.service.migration';
import { STAR_RATING_COMPONENT_MIGRATION } from './data/star-rating.component.migration';
import { STOREFRONT_COMPONENT_MIGRATION } from './data/storefront-component.migration';
import { TAB_PARAGRAPH_CONTAINER_COMPONENT_MIGRATION } from './data/tab-paragraph-container.component.migration';
import { USER_ADDRESS_SERVICE_MIGRATION } from './data/user-address.service.migration';

export const CONSTRUCTOR_DEPRECATION_DATA: ConstructorDeprecation[] = [
  USER_ADDRESS_SERVICE_MIGRATION,
  PAGE_META_SERVICE_MIGRATION,
  CHECKOUT_SERVICE_MIGRATION,
  PROMOTION_SERVICE_MIGRATION,
  SHIPPING_ADDRESS_COMPONENT_MIGRATION,
  PRODUCT_PAGE_META_RESOLVER_MIGRATION,
  CATEGORY_PAGE_META_RESOLVER_MIGRATION,
  CHECKOUT_PAGE_META_RESOLVER_MIGRATION,
  ADD_TO_CART_COMPONENT_MIGRATION,
  MINI_CART_COMPONENT_MIGRATION,
  ...CART_PAGE_LAYOUT_HANDLER_MIGRATIONS,
  CDS_SPARTACUS_EVENT_SERVICE_MIGRATION,
  OCC_CART_ENTRY_ADAPTER_MIGRATION,
  OCC_CART_ADAPTER_MIGRATION,
  OCC_USER_ORDER_ADAPTER_MIGRATION,
  ...REVIEW_SUBMIT_COMPONENT_MIGRATIONS,
  LOGIN_FORM_COMPONENT_MIGRATION,
  STAR_RATING_COMPONENT_MIGRATION,
  CURRENT_PRODUCT_SERVICE_MIGRATION,
  STOREFRONT_COMPONENT_MIGRATION,
  PRODUCT_SERVICE_MIGRATION,
  PRODUCT_LIST_COMPONENT_MIGRATION,
  FOOTER_NAVIGATION_COMPONENT_MIGRATION,
  ...PAGE_SLOT_COMPONENT_MIGRATION,
  SKIP_LINK_SERVICE_MIGRATION,
  PRODUCT_REVIEWS_COMPONENT_MIGRATION,
  SEARCH_BOX_COMPONENT_MIGRATION,
  DYNAMIC_ATTRIBUTE_SERVICE_MIGRATION,
  TAB_PARAGRAPH_CONTAINER_COMPONENT_MIGRATION,
  SELECTIVE_CART_SERVICE_MIGRATION,
  PRODUCT_FACET_NAVIGATION_COMPONENT_MIGRATION,
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
