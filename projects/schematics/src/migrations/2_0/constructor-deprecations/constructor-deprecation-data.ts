import { ConstructorDeprecation } from '../../../shared/utils/file-utils';
import { ADD_TO_CART_COMPONENT_MIGRATION } from './data/add-to-cart.component.migration';
import { ADDRESS_BOOK_COMPONENT_SERVICE_MIGRATIONS } from './data/address-book.component.service.migration';
import { CART_NOT_EMPTY_GUARD_MIGRATION } from './data/cart-not-empty.guard.migration';
import { CART_PAGE_LAYOUT_HANDLER_MIGRATIONS } from './data/cart-page-layout-handler.migration';
import { CART_TOTALS_COMPONENT_MIGRATION } from './data/cart-totals.component.migration';
import { CHECKOUT_AUTH_GUARD_MIGRATION } from './data/checkout-auth.guard.migration';
import { CHECKOUT_DELIVERY_SERVICE_MIGRATION } from './data/checkout-delivery.service.migration';
import { CHECKOUT_DETAILS_SERVICE_MIGRATION } from './data/checkout-details.service.migration';
import { CHECKOUT_LOGIN_COMPONENT_MIGRATION } from './data/checkout-login.component.migration';
import { CHECKOUT_ORDER_SUMMARY_COMPONENT_MIGRATION } from './data/checkout-order-summary.component.migration';
import { CHECKOUT_PAGE_META_RESOLVER_MIGRATION } from './data/checkout-page-meta.resolver.migration';
import { CHECKOUT_PAYMENT_SERVICE_MIGRATION } from './data/checkout-payment.service.migration';
import { CHECKOUT_PROGRESS_MOBILE_TOP_COMPONENT_MIGRATION } from './data/checkout-progress-mobile-top.migration';
import { CHECKOUT_GUARD_MIGRATIONS } from './data/checkout.guard.migration';
import { CHECKOUT_SERVICE_MIGRATION } from './data/checkout.service.migration';
import { MINI_CART_COMPONENT_MIGRATION } from './data/mini-cart.component.migration';
import { NOT_CHECKOUT_AUTH_GUARD_MIGRATION } from './data/not-checkout-auth-guard.migration';
import { PAGE_META_SERVICE_MIGRATION } from './data/page-meta.service.migration';
import { PAYMENT_METHOD_COMPONENT_MIGRATIONS } from './data/payment-method.component.migration';
import { PROMOTION_SERVICE_MIGRATION } from './data/promotion.service.migration';
import { SHIPPING_ADDRESS_COMPONENT_MIGRATION } from './data/shipping-address.component.migration';
import { CDS_SPARTACUS_EVENT_SERVICE_MIGRATION } from './data/spartacus-event.service.migration';
import { USER_ADDRESS_SERVICE_MIGRATION } from './data/user-address.service.migration';
import { USER_CONSENT_SERVICE_MIGRATION } from './data/user-consent.service.migration';
import { USER_ORDER_SERVICE_MIGRATION } from './data/user-order.service.migration';
import { USER_PAYMENT_SERVICE_MIGRATION } from './data/user-payment.service.migration';
import { USER_SERVICE_MIGRATION } from './data/user.service.migration';

export const CONSTRUCTOR_DEPRECATION_DATA: ConstructorDeprecation[] = [
  USER_ADDRESS_SERVICE_MIGRATION,
  USER_CONSENT_SERVICE_MIGRATION,
  USER_PAYMENT_SERVICE_MIGRATION,
  USER_SERVICE_MIGRATION,
  USER_ORDER_SERVICE_MIGRATION,
  PAGE_META_SERVICE_MIGRATION,
  CHECKOUT_SERVICE_MIGRATION,
  CHECKOUT_PAYMENT_SERVICE_MIGRATION,
  CHECKOUT_DELIVERY_SERVICE_MIGRATION,
  PROMOTION_SERVICE_MIGRATION,
  CHECKOUT_LOGIN_COMPONENT_MIGRATION,
  CHECKOUT_DETAILS_SERVICE_MIGRATION,
  NOT_CHECKOUT_AUTH_GUARD_MIGRATION,
  SHIPPING_ADDRESS_COMPONENT_MIGRATION,
  CHECKOUT_PAGE_META_RESOLVER_MIGRATION,
  ADD_TO_CART_COMPONENT_MIGRATION,
  CART_NOT_EMPTY_GUARD_MIGRATION,
  CART_TOTALS_COMPONENT_MIGRATION,
  MINI_CART_COMPONENT_MIGRATION,
  ...ADDRESS_BOOK_COMPONENT_SERVICE_MIGRATIONS,
  ...CHECKOUT_GUARD_MIGRATIONS,
  CHECKOUT_ORDER_SUMMARY_COMPONENT_MIGRATION,
  CHECKOUT_PROGRESS_MOBILE_TOP_COMPONENT_MIGRATION,
  ...PAYMENT_METHOD_COMPONENT_MIGRATIONS,
  CHECKOUT_AUTH_GUARD_MIGRATION,
  ...CART_PAGE_LAYOUT_HANDLER_MIGRATIONS,
  CDS_SPARTACUS_EVENT_SERVICE_MIGRATION,
];
