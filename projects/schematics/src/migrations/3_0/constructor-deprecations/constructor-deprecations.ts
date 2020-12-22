import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { ConstructorDeprecation } from '../../../shared/utils/file-utils';
import { migrateConstructorDeprecation } from '../../mechanism/constructor-deprecations/constructor-deprecations';
import { ACTIVE_CART_SERVICE_MIGRATION } from './data/active-cart.service.migration';
import { AUTH_REDIRECT_SERVICE_CONSTRUCTOR_MIGRATION } from './data/auth-redirect.service.migration';
import { AUTH_GUARD_CONSTRUCTOR_MIGRATION } from './data/auth.guard.migration';
import { AUTH_SERVICE_CONSTRUCTOR_MIGRATION } from './data/auth.service.migration';
import { BREAKPOINT_SERVICE_MIGRATION } from './data/breakpoint.service.migration';
import { CART_NOT_EMPTY_GUARD_MIGRATION } from './data/cart-not-empty.guard.migration';
import { CART_VOUCHER_SERVICE_MIGRATION } from './data/cart-voucher.service.migration';
import { CDC_AUTH_SERVICE_CONSTRUCTOR_MIGRATION } from './data/cdc-auth.service.migration';
import { CHECKOUT_AUTH_GUARD_MIGRATION } from './data/checkout-auth.guard.migration';
import { CHECKOUT_CONFIG_SERVICE_MIGRATION } from './data/checkout-config.service.migration';
import { CHECKOUT_DELIVERY_SERVICE_MIGRATION } from './data/checkout-delivery.service.migration';
import { CHECKOUT_PAYMENT_SERVICE_MIGRATION } from './data/checkout-payment.service.migration';
import { CHECKOUT_PROGRESS_MOBILE_BOTTOM_COMPONENT_MIGRATION } from './data/checkout-progress-mobile-bottom.component.migration';
import { CHECKOUT_PROGRESS_MOBILE_TOP_COMPONENT_MIGRATION } from './data/checkout-progress-mobile-top.component.migration';
import { CHECKOUT_PROGRESS_COMPONENT_MIGRATION } from './data/checkout-progress.component.migration';
import { CHECKOUT_GUARD_MIGRATION } from './data/checkout.guard.migration';
import { CHECKOUT_SERVICE_MIGRATION } from './data/checkout.service.migration';
import { CONTENT_PAGE_META_RESOLVER_MIGRATION } from './data/content-page-meta.resolver.migration';
import { CUSTOMER_COUPON_SERVICE_MIGRATION } from './data/customer-coupon.service.migration';
import { DELIVERY_MODE_SET_GUARD_MIGRATION } from './data/delivery-mode-set.guard.migration';
import { DELIVERY_MODE_COMPONENT_MIGRATION } from './data/delivery-mode.component.migration';
import { FEATURE_MODULES_SERVICE_MIGRATION } from './data/feature-modules.service.migration';
import { FORBIDDEN_HANDLER_MIGRATION } from './data/forbidden.handler.migration';
import { FORGOT_PASSWORD_COMPONENT_MIGRATION } from './data/forgot-password.component.migration';
import { JSON_LD_SCRIPT_FACTORY_CONSTRUCTOR_MIGRATION } from './data/json-ld.script.factory.migration';
import { JSONLD_PRODUCT_REVIEW_BUILDER_MIGRATION } from './data/jsonld-product-review.builder.migration';
import { LOGIN_FORM_COMPONENT_MIGRATION } from './data/login-form.component.migration';
import { LOGOUT_GUARD_MIGRATION } from './data/logout-guard.migration';
import { MULTI_CART_SERVICE_MIGRATION } from './data/multi-cart.service.migration';
import { NOT_AUTH_GUARD_CONSTRUCTOR_MIGRATION } from './data/not-auth.guard.migration';
import { NOT_CHECKOUT_AUTH_GUARD_MIGRATION } from './data/not-checkout-auth.guard.migration';
import { ORDER_CANCELLATION_GUARD_MIGRATION } from './data/order-cancellation.guard.migration';
import { ORDER_CONFIRMATION_OVERVIEW_COMPONENT_MIGRATION } from './data/order-confirmation-overview.component.migration';
import { ORDER_DETAIL_SHIPPING_COMPONENT_MIGRATION } from './data/order-detail-shipping.component.migration';
import { ORDER_HISTORY_COMPONENT_MIGRATION } from './data/order-history-component.migration';
import { ORDER_RETURN_REQUEST_SERVICE_MIGRATION } from './data/order-return-request.service.migration';
import { ORDER_RETURN_GUARD_MIGRATION } from './data/order-return.guard.migration';
import { OUTLET_REF_DIRECTIVE_CONSTRUCTOR_MIGRATION } from './data/outlet-ref.directive.migration';
import { OUTLET_SERVICE_CONSTRUCTOR_MIGRATION } from './data/outlet.service.migration';
import { PAGE_SLOT_COMPONENT_MIGRATION } from './data/page-slot.component.migration';
import { PAYMENT_DETAILS_SET_GUARD_MIGRATION } from './data/payment-details-set.guard.migration';
import { PAYMENT_METHOD_COMPONENT_MIGRATION } from './data/payment-method.component.migration';
import { PLACE_ORDER_COMPONENT_MIGRATION } from './data/place-order.component.migration';
import { PRODUCT_CAROUSEL_SERVICE_MIGRATION } from './data/product-carousel.service.migration';
import { PRODUCT_VARIANT_GUARD_MIGRATION } from './data/product-variant.guard.migration';
import { REGISTER_COMPONENT_MIGRATION } from './data/register.component.migration';
import { REVIEW_SUBMIT_COMPONENT_MIGRATION } from './data/review-submit.component.migration';
import { ROUTING_SERVICE_MIGRATION } from './data/routing.service.migration';
import { SELECTIVE_CART_SERVICE_MIGRATION } from './data/selective-cart.service.migration';
import { SHIPPING_ADDRESS_SET_GUARD_MIGRATION } from './data/shipping-address-set.guard.migration';
import { SHIPPING_ADDRESS_COMPONENT_MIGRATION } from './data/shipping-address.component.migration';
import { SPLIT_VIEW_COMPONENT_MIGRATION } from './data/split-view.component.migration';
import { STAR_RATING_COMPONENT_MIGRATION } from './data/star-rating.component.migration';
import { STOCK_NOTIFICATION_COMPONENT_MIGRATION } from './data/stock-notification.component.migration';
import { USER_ADDRESS_SERVICE_MIGRATION } from './data/user-address.service.migration';
import { USER_CONSENT_SERVICE_MIGRATION } from './data/user-consent.service.migration';
import { USER_INTERESTS_SERVICE_MIGRATION } from './data/user-interests.service.migration';
import { USER_NOTIFICATION_PREFERENCE_SERVICE_MIGRATION } from './data/user-notification-preference.service.migration';
import { USER_ORDERS_EFFECT_MIGRATION } from './data/user-order.effect.migration';
import { USER_ORDER_SERVICE_MIGRATION } from './data/user-order.service.migration';
import { USER_PAYMENT_SERVICE_MIGRATION } from './data/user-payment.service.migration';
import { USER_REGISTER_EFFECT_MIGRATION } from './data/user-register.effect.migration';
import { USER_SERVICE_MIGRATION } from './data/user.service.migration';
import { VIEW_COMPONENT_MIGRATION } from './data/view.component.migration';
import { WISH_LIST_SERVICE_MIGRATION } from './data/wish-list.service.migration';

export const CONSTRUCTOR_DEPRECATION_DATA: ConstructorDeprecation[] = [
  CHECKOUT_PROGRESS_MOBILE_BOTTOM_COMPONENT_MIGRATION,
  CHECKOUT_PROGRESS_MOBILE_TOP_COMPONENT_MIGRATION,
  CHECKOUT_PROGRESS_COMPONENT_MIGRATION,
  DELIVERY_MODE_COMPONENT_MIGRATION,
  STOCK_NOTIFICATION_COMPONENT_MIGRATION,
  PAYMENT_METHOD_COMPONENT_MIGRATION,
  REVIEW_SUBMIT_COMPONENT_MIGRATION,
  PLACE_ORDER_COMPONENT_MIGRATION,
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
  NOT_AUTH_GUARD_CONSTRUCTOR_MIGRATION,
  AUTH_GUARD_CONSTRUCTOR_MIGRATION,
  AUTH_REDIRECT_SERVICE_CONSTRUCTOR_MIGRATION,
  AUTH_SERVICE_CONSTRUCTOR_MIGRATION,
  CDC_AUTH_SERVICE_CONSTRUCTOR_MIGRATION,
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
  CART_NOT_EMPTY_GUARD_MIGRATION,
  NOT_CHECKOUT_AUTH_GUARD_MIGRATION,
  ORDER_CANCELLATION_GUARD_MIGRATION,
  ORDER_RETURN_GUARD_MIGRATION,
  PRODUCT_VARIANT_GUARD_MIGRATION,
  PAGE_SLOT_COMPONENT_MIGRATION,
  LOGOUT_GUARD_MIGRATION,
  USER_NOTIFICATION_PREFERENCE_SERVICE_MIGRATION,
  USER_INTERESTS_SERVICE_MIGRATION,
  USER_CONSENT_SERVICE_MIGRATION,
  USER_ADDRESS_SERVICE_MIGRATION,
  ORDER_RETURN_REQUEST_SERVICE_MIGRATION,
  CUSTOMER_COUPON_SERVICE_MIGRATION,
  FORBIDDEN_HANDLER_MIGRATION,
  CHECKOUT_PAYMENT_SERVICE_MIGRATION,
  CHECKOUT_SERVICE_MIGRATION,
  JSONLD_PRODUCT_REVIEW_BUILDER_MIGRATION,
  FORGOT_PASSWORD_COMPONENT_MIGRATION,
  USER_PAYMENT_SERVICE_MIGRATION,
  USER_REGISTER_EFFECT_MIGRATION,
  USER_SERVICE_MIGRATION,
  STAR_RATING_COMPONENT_MIGRATION,
  OUTLET_REF_DIRECTIVE_CONSTRUCTOR_MIGRATION,
  OUTLET_SERVICE_CONSTRUCTOR_MIGRATION,
  JSON_LD_SCRIPT_FACTORY_CONSTRUCTOR_MIGRATION,
  REGISTER_COMPONENT_MIGRATION,
  PRODUCT_CAROUSEL_SERVICE_MIGRATION,
  VIEW_COMPONENT_MIGRATION,
  SPLIT_VIEW_COMPONENT_MIGRATION,
  BREAKPOINT_SERVICE_MIGRATION,
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
