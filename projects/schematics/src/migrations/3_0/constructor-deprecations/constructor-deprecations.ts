import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { ConstructorDeprecation } from '../../../shared/utils/file-utils';
import { migrateConstructorDeprecation } from '../../mechanism/constructor-deprecations/constructor-deprecations';
import { CHECKOUT_AUTH_GUARD_MIGRATION } from './data/checkout-auth.guard.migration';
import { CHECKOUT_CONFIG_SERVICE_MIGRATION } from './data/checkout-config.service.migration';
import { CHECKOUT_PROGRESS_MOBILE_BOTTOM_COMPONENT_MIGRATION } from './data/checkout-progress-mobile-bottom.component.migration';
import { CHECKOUT_PROGRESS_MOBILE_TOP_COMPONENT_MIGRATION } from './data/checkout-progress-mobile-top.component.migration';
import { CHECKOUT_PROGRESS_COMPONENT_MIGRATION } from './data/checkout-progress.component.migration';
import { CHECKOUT_GUARD_MIGRATION } from './data/checkout.guard.migration';
import { CONTENT_PAGE_META_RESOLVER_MIGRATION } from './data/content-page-meta.resolver.migration';
import { DELIVERY_MODE_SET_GUARD_MIGRATION } from './data/delivery-mode-set.guard.migration';
import { DELIVERY_MODE_COMPONENT_MIGRATION } from './data/delivery-mode.component.migration';
import { LOGIN_FORM_COMPONENT_MIGRATION } from './data/login-form.component.migration';
import { MULTI_CART_SERVICE_MIGRATION } from './data/multi-cart.service.migration';
import { ORDER_DETAILS_SHIPPING_COMPONENT_MIGRATION } from './data/order-detail-shipping.component.migration';
import { PAYMENT_DETAILS_SET_GUARD_MIGRATION } from './data/payment-details-set.guard.migration';
import { PAYMENT_METHOD_COMPONENT_MIGRATION } from './data/payment-method.component.migration';
import { REVIEW_SUBMIT_COMPONENT_MIGRATION } from './data/review-submit.component.migration';
import { ROUTING_SERVICE_MIGRATION } from './data/routing.service.migration';
import { SHIPPING_ADDRESS_SET_GUARD_MIGRATION } from './data/shipping-address-set.guard.migration';
import { SHIPPING_ADDRESS_COMPONENT_MIGRATION } from './data/shipping-address.component.migration';
import { PAGE_SLOT_COMPONENT_MIGRATION } from './data/page-slot.component.migration';
import { USER_NOTIFICATION_PREFERENCE_SERVICE_MIGRATION } from './data/user-notification-preference.service.migration';
import { USER_INTERESTS_SERVICE_MIGRATION } from './data/user-interests.service.migration';
import { USER_CONSENT_SERVICE_MIGRATION } from './data/user-consent.service.migration';
import { USER_ADDRESS_SERVICE_MIGRATION } from './data/user-address.service.migration';
import { ORDER_RETURN_REQUEST_SERVICE_MIGRATION } from './data/order-return-request.service.migration';
import { CUSTOMER_COUPON_SERVICE_MIGRATION } from './data/customer-coupon.service.migration';
import { FORBIDDEN_HANDLER_MIGRATION } from './data/forbidden.handler.migration';
import { CHECKOUT_PAYMENT_SERVICE_MIGRATION } from './data/checkout-payment.service.migration';
import { CHECKOUT_SERVICE_MIGRATION } from './data/checkout.service.migration';

export const CONSTRUCTOR_DEPRECATION_DATA: ConstructorDeprecation[] = [
  CHECKOUT_PROGRESS_MOBILE_BOTTOM_COMPONENT_MIGRATION,
  CHECKOUT_PROGRESS_MOBILE_TOP_COMPONENT_MIGRATION,
  CHECKOUT_PROGRESS_COMPONENT_MIGRATION,
  DELIVERY_MODE_COMPONENT_MIGRATION,
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
  ORDER_DETAILS_SHIPPING_COMPONENT_MIGRATION,
  ROUTING_SERVICE_MIGRATION,
  MULTI_CART_SERVICE_MIGRATION,
  CONTENT_PAGE_META_RESOLVER_MIGRATION,
  PAGE_SLOT_COMPONENT_MIGRATION,
  USER_NOTIFICATION_PREFERENCE_SERVICE_MIGRATION,
  USER_INTERESTS_SERVICE_MIGRATION,
  USER_CONSENT_SERVICE_MIGRATION,
  USER_ADDRESS_SERVICE_MIGRATION,
  ORDER_RETURN_REQUEST_SERVICE_MIGRATION,
  CUSTOMER_COUPON_SERVICE_MIGRATION,
  FORBIDDEN_HANDLER_MIGRATION,
  CHECKOUT_PAYMENT_SERVICE_MIGRATION,
  CHECKOUT_SERVICE_MIGRATION,
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
