import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { ConstructorDeprecation } from '../../../shared/utils/file-utils';
import { migrateConstructorDeprecation } from '../../mechanism/constructor-deprecations/constructor-deprecations';
import { CHECKOUT_AUTH_GUARD_MIGRATION } from './data/checkout-auth.guard.migration';
import { CHECKOUT_CONFIG_SERVICE_MIGRATION } from './data/checkout-config.service.migration';
import { CHECKOUT_PROGRESS_MOBILE_BOTTOM_COMPONENT_MIGRATION } from './data/checkout-progress-mobile-bottom.component.migration';
import { CHECKOUT_PROGRESS_MOBILE_TOP_COMPONENT_MIGRATION } from './data/checkout-progress-mobile-top.component.migration';
import { CHECKOUT_PROGRESS_COMPONENT_MIGRATION } from './data/checkout-progress.component.migration';
import { CHECKOUT_GUARD_MIGRATION } from './data/checkout.guard.migration';
import { DELIVERY_MODE_SET_GUARD_MIGRATION } from './data/delivery-mode-set.guard.migration';
import { DELIVERY_MODE_COMPONENT_MIGRATION } from './data/delivery-mode.component.migration';
import { LOGIN_FORM_COMPONENT_MIGRATION } from './data/login-form.component.migration';
import { ORDER_CONFIRMATION_OVERVIEW_COMPONENT_MIGRATION } from './data/order-confirmation-overview.component.migration';
import { ORDER_DETAIL_SHIPPING_COMPONENT_MIGRATION } from './data/order-detail-shipping.component.migration';
import { ORDER_HISTORY_COMPONENT_MIGRATION } from './data/order-history-component.migration';
import { PAYMENT_DETAILS_SET_GUARD_MIGRATION } from './data/payment-details-set.guard.migration';
import { PAYMENT_METHOD_COMPONENT_MIGRATION } from './data/payment-method.component.migration';
import { REVIEW_SUBMIT_COMPONENT_MIGRATION } from './data/review-submit.component.migration';
import { ROUTING_SERVICE_MIGRATION } from './data/routing.service.migration';
import { SHIPPING_ADDRESS_SET_GUARD_MIGRATION } from './data/shipping-address-set.guard.migration';
import { SHIPPING_ADDRESS_COMPONENT_MIGRATION } from './data/shipping-address.component.migration';
import { USER_ORDERS_EFFECT_MIGRATION } from './data/user-order.effect.migration';
import { USER_ORDER_SERVICE_MIGRATION } from './data/user-order.service.migration';

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
  ROUTING_SERVICE_MIGRATION,
  ORDER_CONFIRMATION_OVERVIEW_COMPONENT_MIGRATION,
  ORDER_DETAIL_SHIPPING_COMPONENT_MIGRATION,
  ORDER_HISTORY_COMPONENT_MIGRATION,
  USER_ORDER_SERVICE_MIGRATION,
  USER_ORDERS_EFFECT_MIGRATION,
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
