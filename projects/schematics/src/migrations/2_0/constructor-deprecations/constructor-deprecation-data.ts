import { ConstructorDeprecation } from '../../../shared/utils/file-utils';
import { ADD_TO_CART_COMPONENT_MIGRATION } from './data/add-to-cart.component.migration';
import { ADDED_TO_CART_DIALOG_COMPONENT_MIGRATIONS } from './data/added-to-cart-dialog.component.migration';
import { ADDRESS_BOOK_COMPONENT_SERVICE_MIGRATIONS } from './data/address-book.component.service.migration';
import { CART_COUPON_COMPONENT_MIGRATIONS } from './data/cart-coupon.component.migration';
import { CART_DETAILS_COMPONENT_MIGRATIONS } from './data/cart-details.component.migration';
import { CART_ITEM_LIST_COMPONENT_MIGRATIONS } from './data/cart-item-list.component.migration';
import { CART_NOT_EMPTY_GUARD_MIGRATION } from './data/cart-not-empty.guard.migration';
import { CART_PAGE_LAYOUT_HANDLER_MIGRATIONS } from './data/cart-page-layout-handler.migration';
import { CART_TOTALS_COMPONENT_MIGRATION } from './data/cart-totals.component.migration';
import { CART_VOUCHER_SERVICE_MIGRATION } from './data/cart-voucher.service.migration';
import { CHECKOUT_AUTH_GUARD_MIGRATION } from './data/checkout-auth.guard.migration';
import { CHECKOUT_DELIVERY_SERVICE_MIGRATION } from './data/checkout-delivery.service.migration';
import { CHECKOUT_DETAILS_SERVICE_MIGRATION } from './data/checkout-details.service.migration';
import { CHECKOUT_LOGIN_COMPONENT_MIGRATION } from './data/checkout-login.component.migration';
import { CHECKOUT_ORDER_SUMMARY_COMPONENT_MIGRATION } from './data/checkout-order-summary.component.migration';
import { CHECKOUT_PAYMENT_SERVICE_MIGRATION } from './data/checkout-payment.service.migration';
import { CHECKOUT_PROGRESS_MOBILE_TOP_COMPONENT_MIGRATION } from './data/checkout-progress-mobile-top.migration';
import { CHECKOUT_GUARD_MIGRATIONS } from './data/checkout.guard.migration';
import { CHECKOUT_SERVICE_MIGRATION } from './data/checkout.service.migration';
import { CONFIGURABLE_ROUTES_SERVICE_MIGRATION } from './data/configurable-routes.service.migration';
import { CONSENT_MANAGEMENT_COMPONENT_MIGRATION } from './data/consent-management.component.migration';
import { CURRENT_PRODUCT_SERVICE_MIGRATION } from './data/current-product-service.migration';
import { CUSTOMER_COUPON_SERVICE_MIGRATION } from './data/customer-coupon.service.migration';
import { EXTERNAL_ROUTES_SERVICE_MIGRATION } from './data/external-routes.service.migration';
import { FOOTER_NAVIGATION_COMPONENT_MIGRATION } from './data/footer-navigation.component.migration';
import { LOGIN_FORM_COMPONENT_MIGRATION } from './data/login-form.component.migration';
import { MINI_CART_COMPONENT_MIGRATION } from './data/mini-cart.component.migration';
import { NOT_CHECKOUT_AUTH_GUARD_MIGRATION } from './data/not-checkout-auth-guard.migration';
import { ORDER_CONFIRMATION_ITEMS_COMPONENT_MIGRATION } from './data/order-confirmation-items.component.migration';
import { ORDER_DETAIL_ITEMS_COMPONENT_MIGRATION } from './data/order-detail-items.component.migration';
import { CATEGORY_PAGE_META_RESOLVER_MIGRATION } from './data/page-resolvers/category-page-meta.resolver.migration';
import { CHECKOUT_PAGE_META_RESOLVER_MIGRATION } from './data/page-resolvers/checkout-page-meta.resolver.migration';
import { PAGE_META_SERVICE_MIGRATION } from './data/page-resolvers/page-meta.service.migration';
import { PRODUCT_PAGE_META_RESOLVER_MIGRATION } from './data/page-resolvers/product-page-meta.resolver.migration';
import { PAYMENT_METHOD_COMPONENT_MIGRATIONS } from './data/payment-method.component.migration';
import { PRODUCT_CAROUSEL_COMPONENT_MIGRATION } from './data/product-carousel-component.migration';
import { PRODUCT_SERVICE_MIGRATION } from './data/product-service.migration';
import { PROMOTION_SERVICE_MIGRATION } from './data/promotion.service.migration';
import { REGISTER_COMPONENT_MIGRATIONS } from './data/register.component.migration';
import { REVIEW_SUBMIT_COMPONENT_MIGRATIONS } from './data/review-submit.component.migration';
import { SHIPPING_ADDRESS_COMPONENT_MIGRATION } from './data/shipping-address.component.migration';
import { CDS_SPARTACUS_EVENT_SERVICE_MIGRATION } from './data/spartacus-event.service.migration';
import { STAR_RATING_COMPONENT_MIGRATION } from './data/star-rating.component.migration';
import { USER_ADDRESS_SERVICE_MIGRATION } from './data/user-address.service.migration';
import { USER_CONSENT_SERVICE_MIGRATION } from './data/user-consent.service.migration';
import { USER_INTERESTS_SERVICE_MIGRATION } from './data/user-interests.service.migration';
import { USER_NOTIFICATION_PREFERENCE_SERVICE_MIGRATION } from './data/user-notification-preference.service.migration';
import { USER_ORDER_SERVICE_MIGRATION } from './data/user-order.service.migration';
import { USER_PAYMENT_SERVICE_MIGRATION } from './data/user-payment.service.migration';
import { USER_SERVICE_MIGRATION } from './data/user.service.migration';
import { PLACE_ORDER_COMPONENT_MIGRATION } from './data/place-order.component.migration';
import { PAYMENT_FORM_COMPONENT_MIGRATION } from './data/payment-form.component.migration';

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

  PRODUCT_PAGE_META_RESOLVER_MIGRATION,
  CATEGORY_PAGE_META_RESOLVER_MIGRATION,
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
  ...ADDED_TO_CART_DIALOG_COMPONENT_MIGRATIONS,
  ...CART_DETAILS_COMPONENT_MIGRATIONS,
  ...REVIEW_SUBMIT_COMPONENT_MIGRATIONS,
  ORDER_DETAIL_ITEMS_COMPONENT_MIGRATION,
  ORDER_CONFIRMATION_ITEMS_COMPONENT_MIGRATION,
  CART_VOUCHER_SERVICE_MIGRATION,
  ...CART_COUPON_COMPONENT_MIGRATIONS,
  ...CART_ITEM_LIST_COMPONENT_MIGRATIONS,
  LOGIN_FORM_COMPONENT_MIGRATION,
  ...REGISTER_COMPONENT_MIGRATIONS,
  STAR_RATING_COMPONENT_MIGRATION,
  CURRENT_PRODUCT_SERVICE_MIGRATION,
  PRODUCT_SERVICE_MIGRATION,
  PRODUCT_CAROUSEL_COMPONENT_MIGRATION,
  CONSENT_MANAGEMENT_COMPONENT_MIGRATION,
  FOOTER_NAVIGATION_COMPONENT_MIGRATION,
  CONFIGURABLE_ROUTES_SERVICE_MIGRATION,
  EXTERNAL_ROUTES_SERVICE_MIGRATION,
  PLACE_ORDER_COMPONENT_MIGRATION,
  CUSTOMER_COUPON_SERVICE_MIGRATION,
  USER_INTERESTS_SERVICE_MIGRATION,
  USER_NOTIFICATION_PREFERENCE_SERVICE_MIGRATION,
  PAYMENT_FORM_COMPONENT_MIGRATION,
];
