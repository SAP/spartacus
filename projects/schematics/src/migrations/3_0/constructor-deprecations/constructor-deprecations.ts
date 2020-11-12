import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { ConstructorDeprecation } from '../../../shared/utils/file-utils';
import { migrateConstructorDeprecation } from '../../mechanism/constructor-deprecations/constructor-deprecations';
import { ACTIVE_CART_SERVICE_MIGRATION } from './data/active-cart.service.migration';
import { CART_VOUCHER_SERVICE_MIGRATION } from './data/cart-voucher.service.migration';
import { CHECKOUT_AUTH_GUARD_MIGRATION } from './data/checkout-auth.guard.migration';
import { CHECKOUT_CONFIG_SERVICE_MIGRATION } from './data/checkout-config.service.migration';
import { CHECKOUT_DELIVERY_SERVICE_MIGRATION } from './data/checkout-delivery.service.migration';
import { CHECKOUT_PROGRESS_MOBILE_BOTTOM_COMPONENT_MIGRATION } from './data/checkout-progress-mobile-bottom.component.migration';
import { CHECKOUT_PROGRESS_MOBILE_TOP_COMPONENT_MIGRATION } from './data/checkout-progress-mobile-top.component.migration';
import { CHECKOUT_PROGRESS_COMPONENT_MIGRATION } from './data/checkout-progress.component.migration';
import { CHECKOUT_GUARD_MIGRATION } from './data/checkout.guard.migration';
import { CONTENT_PAGE_META_RESOLVER_MIGRATION } from './data/content-page-meta.resolver.migration';
import { DELIVERY_MODE_SET_GUARD_MIGRATION } from './data/delivery-mode-set.guard.migration';
import { DELIVERY_MODE_COMPONENT_MIGRATION } from './data/delivery-mode.component.migration';
import { FEATURE_MODULES_SERVICE_MIGRATION } from './data/feature-modules.service.migration';
import { JSONLD_PRODUCT_REVIEW_BUILDER_MIGRATION } from './data/jsonld-product-review.builder.migration';
import { LOGIN_FORM_COMPONENT_MIGRATION } from './data/login-form.component.migration';
import { MULTI_CART_SERVICE_MIGRATION } from './data/multi-cart.service.migration';
import { ORDER_CONFIRMATION_OVERVIEW_COMPONENT_MIGRATION } from './data/order-confirmation-overview.component.migration';
import { ORDER_DETAIL_SHIPPING_COMPONENT_MIGRATION } from './data/order-detail-shipping.component.migration';
import { ORDER_HISTORY_COMPONENT_MIGRATION } from './data/order-history-component.migration';
import { PAGE_SLOT_COMPONENT_MIGRATION } from './data/page-slot.component.migration';
import { PAYMENT_DETAILS_SET_GUARD_MIGRATION } from './data/payment-details-set.guard.migration';
import { PAYMENT_METHOD_COMPONENT_MIGRATION } from './data/payment-method.component.migration';
import { REVIEW_SUBMIT_COMPONENT_MIGRATION } from './data/review-submit.component.migration';
import { ROUTING_SERVICE_MIGRATION } from './data/routing.service.migration';
import { SELECTIVE_CART_SERVICE_MIGRATION } from './data/selective-cart.service.migration';
import { SHIPPING_ADDRESS_SET_GUARD_MIGRATION } from './data/shipping-address-set.guard.migration';
import { SHIPPING_ADDRESS_COMPONENT_MIGRATION } from './data/shipping-address.component.migration';
import { STOCK_NOTIFICATION_COMPONENT_MIGRATION } from './data/stock-notification.component.migration';
import { USER_ORDERS_EFFECT_MIGRATION } from './data/user-order.effect.migration';
import { USER_ORDER_SERVICE_MIGRATION } from './data/user-order.service.migration';
import { WISH_LIST_SERVICE_MIGRATION } from './data/wish-list.service.migration';

export const CONSTRUCTOR_DEPRECATION_DATA: ConstructorDeprecation[] = [
  CHECKOUT_PROGRESS_MOBILE_BOTTOM_COMPONENT_MIGRATION,
  CHECKOUT_PROGRESS_MOBILE_TOP_COMPONENT_MIGRATION,
  CHECKOUT_PROGRESS_COMPONENT_MIGRATION,
  DELIVERY_MODE_COMPONENT_MIGRATION,
  STOCK_NOTIFICATION_COMPONENT_MIGRATION,
  PAYMENT_METHOD_COMPONENT_MIGRATION,
  REVIEW_SUBMIT_COMPONENT_MIGRATION,
  SHIPPING_ADDRESS_COMPONENT_MIGRATION,
  SHIPPING_ADDRESS_SET_GUARD_MIGRATION,
  DELIVERY_MODE_SET_GUARD_MIGRATION,
  PAYMENT_DETAILS_SET_GUARD_MIGRATION,
  CHECKOUT_CONFIG_SERVICE_MIGRATION,
  LOGIN_FORM_COMPONENT_MIGRATION,
  CHECKOUT_GUARD_MIGRATION,
  CHECKOUT_AUTH_GUARD_MIGRATION,
  ROUTING_SERVICE_MIGRATION,
  FEATURE_MODULES_SERVICE_MIGRATION,
  ORDER_CONFIRMATION_OVERVIEW_COMPONENT_MIGRATION,
  ORDER_DETAIL_SHIPPING_COMPONENT_MIGRATION,
  ORDER_HISTORY_COMPONENT_MIGRATION,
  USER_ORDER_SERVICE_MIGRATION,
  USER_ORDERS_EFFECT_MIGRATION,
  ACTIVE_CART_SERVICE_MIGRATION,
  CART_VOUCHER_SERVICE_MIGRATION,
  SELECTIVE_CART_SERVICE_MIGRATION,
  WISH_LIST_SERVICE_MIGRATION,
  CHECKOUT_DELIVERY_SERVICE_MIGRATION,
  MULTI_CART_SERVICE_MIGRATION,
  CONTENT_PAGE_META_RESOLVER_MIGRATION,
  PAGE_SLOT_COMPONENT_MIGRATION,
  JSONLD_PRODUCT_REVIEW_BUILDER_MIGRATION,
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
