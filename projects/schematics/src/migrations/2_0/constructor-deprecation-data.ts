import {
  ACTIVATED_ROUTE,
  ACTIVE_CART_SERVICE,
  ADDRESS_BOOK_COMPONENT_SERVICE,
  ADD_TO_CART_COMPONENT,
  ANGULAR_CORE,
  ANGULAR_FORMS,
  ANGULAR_ROUTER,
  AUTH_REDIRECT_SERVICE,
  AUTH_SERVICE,
  CART_DATA_SERVICE,
  CART_NOT_EMPTY_GUARD,
  CART_PAGE_LAYOUT_HANDLER,
  CART_SERVICE,
  CART_TOTALS_COMPONENT,
  CDS_CONFIG,
  CDS_SPARTACUS_EVENT_SERVICE,
  CHANGE_DETECTOR_REF,
  CHECKOUT_AUTH_GUARD,
  CHECKOUT_CONFIG,
  CHECKOUT_CONFIG_SERVICE,
  CHECKOUT_DELIVERY_SERVICE,
  CHECKOUT_DETAILS_SERVICE,
  CHECKOUT_GUARD,
  CHECKOUT_LOGIN_COMPONENT,
  CHECKOUT_ORDER_SUMMARY_COMPONENT,
  CHECKOUT_PAGE_META_RESOLVER,
  CHECKOUT_PAYMENT_SERVICE,
  CHECKOUT_PROGRESS_MOBILE_TOP_COMPONENT,
  CHECKOUT_SERVICE,
  CMS_SERVICE,
  CONSENT_SERVICE,
  CURRENT_PRODUCT_SERVICE,
  EXPRESS_CHECKOUT_SERVICE,
  FEATURE_CONFIG_SERVICE,
  FORM_BUILDER,
  GLOBAL_MESSAGE_SERVICE,
  MINI_CART_COMPONENT,
  MODAL_SERVICE,
  NGRX_STORE,
  NOT_CHECKOUT_AUTH_GUARD,
  ORDER_DETAILS_SERVICE,
  PAGE_META_RESOLVER,
  PAGE_META_SERVICE,
  PAYMENT_METHOD_COMPONENT,
  PROMOTION_SERVICE,
  ROUTER,
  ROUTING_CONFIG_SERVICE,
  ROUTING_SERVICE,
  SELECTIVE_CART_SERVICE,
  SHIPPING_ADDRESS_COMPONENT,
  SPARTACUS_CDS,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
  STORE,
  TRANSLATION_SERVICE,
  USER_ADDRESS_SERVICE,
  USER_PAYMENT_SERVICE,
} from '../../shared/constants';
import { ConstructorDeprecation } from '../../shared/utils/file-utils';

export const CONSTRUCTOR_DEPRECATION_DATA: ConstructorDeprecation[] = [
  // projects/core/src/user/facade/user-address.service.ts
  {
    class: USER_ADDRESS_SERVICE,
    importPath: SPARTACUS_CORE,
    deprecatedParams: [
      {
        className: STORE,
        importPath: NGRX_STORE,
      },
    ],
    addParams: [
      {
        className: AUTH_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
  },
  // projects/core/src/cms/facade/page-meta.service.ts
  {
    class: PAGE_META_SERVICE,
    importPath: SPARTACUS_CORE,
    deprecatedParams: [
      { className: PAGE_META_RESOLVER, importPath: SPARTACUS_CORE },
      { className: CMS_SERVICE, importPath: SPARTACUS_CORE },
      {
        className: FEATURE_CONFIG_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
    removeParams: [
      {
        className: FEATURE_CONFIG_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
  },
  // projects/core/src/checkout/facade/checkout.service.ts
  {
    class: CHECKOUT_SERVICE,
    importPath: SPARTACUS_CORE,
    deprecatedParams: [
      {
        className: STORE,
        importPath: NGRX_STORE,
      },
      {
        className: CART_DATA_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
    removeParams: [
      {
        className: CART_DATA_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
    addParams: [
      {
        className: AUTH_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: ACTIVE_CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
  },
  // projects/core/src/checkout/facade/checkout-payment.service.ts
  {
    class: CHECKOUT_PAYMENT_SERVICE,
    importPath: SPARTACUS_CORE,
    deprecatedParams: [
      {
        className: STORE,
        importPath: NGRX_STORE,
      },
      {
        className: CART_DATA_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
    removeParams: [
      {
        className: CART_DATA_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
    addParams: [
      {
        className: AUTH_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: ACTIVE_CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
  },
  // projects/core/src/checkout/facade/checkout-delivery.service.ts
  {
    class: CHECKOUT_DELIVERY_SERVICE,
    importPath: SPARTACUS_CORE,
    deprecatedParams: [
      {
        className: STORE,
        importPath: NGRX_STORE,
      },
      {
        className: CART_DATA_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
    removeParams: [
      {
        className: CART_DATA_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
    addParams: [
      {
        className: AUTH_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: ACTIVE_CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
  },
  // projects/storefrontlib/src/shared/services/promotion/promotion.service.ts
  {
    class: PROMOTION_SERVICE,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
      {
        className: CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: ORDER_DETAILS_SERVICE,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
      {
        className: CHECKOUT_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
    removeParams: [
      {
        className: CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
    addParams: [
      {
        className: ACTIVE_CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
  },
  // projects/storefrontlib/src/cms-components/user/checkout-login/checkout-login.component.ts
  {
    class: CHECKOUT_LOGIN_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
      {
        className: FORM_BUILDER,
        importPath: ANGULAR_FORMS,
      },
      {
        className: CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: AUTH_REDIRECT_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
    removeParams: [
      {
        className: CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
    addParams: [
      {
        className: ACTIVE_CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
  },
  // projects/storefrontlib/src/cms-components/checkout/services/checkout-details.service.ts
  {
    class: CHECKOUT_DETAILS_SERVICE,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
      {
        className: CHECKOUT_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: CHECKOUT_DELIVERY_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: CHECKOUT_PAYMENT_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
    removeParams: [
      {
        className: CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
    addParams: [
      {
        className: ACTIVE_CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
  },
  // projects/storefrontlib/src/cms-components/checkout/guards/not-checkout-auth-guard.ts
  {
    class: NOT_CHECKOUT_AUTH_GUARD,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
      {
        className: ROUTING_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: AUTH_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
    removeParams: [
      {
        className: CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
    addParams: [
      {
        className: ACTIVE_CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
  },
  // projects/storefrontlib/src/cms-components/checkout/components/shipping-address/shipping-address.component.ts
  {
    class: SHIPPING_ADDRESS_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
      {
        className: USER_ADDRESS_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: ROUTING_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: CHECKOUT_DELIVERY_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: CHECKOUT_CONFIG_SERVICE,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
      {
        className: ACTIVATED_ROUTE,
        importPath: ANGULAR_ROUTER,
      },
      {
        className: TRANSLATION_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
    removeParams: [
      {
        className: CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
    addParams: [
      {
        className: ACTIVE_CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
  },
  // projects/core/src/checkout/services/checkout-page-meta.resolver.ts
  {
    class: CHECKOUT_PAGE_META_RESOLVER,
    importPath: SPARTACUS_CORE,
    deprecatedParams: [
      {
        className: CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: TRANSLATION_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
    removeParams: [
      {
        className: CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
    addParams: [
      {
        className: ACTIVE_CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
  },
  // projects/storefrontlib/src/cms-components/cart/add-to-cart/add-to-cart.component.ts
  {
    class: ADD_TO_CART_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
      {
        className: CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: CURRENT_PRODUCT_SERVICE,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
      {
        className: MODAL_SERVICE,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
      {
        className: CHANGE_DETECTOR_REF,
        importPath: ANGULAR_CORE,
      },
    ],
    removeParams: [
      {
        className: CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
    addParams: [
      {
        className: ACTIVE_CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
  },
  // projects/storefrontlib/src/cms-components/cart/cart-not-empty.guard.ts
  {
    class: CART_NOT_EMPTY_GUARD,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
      {
        className: CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: ROUTING_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
    removeParams: [
      {
        className: CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
    addParams: [
      {
        className: ACTIVE_CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
  },
  // projects/storefrontlib/src/cms-components/cart/cart-totals/cart-totals.component.ts
  {
    class: CART_TOTALS_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
      {
        className: CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
    removeParams: [
      {
        className: CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
    addParams: [
      {
        className: ACTIVE_CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
  },
  // projects/storefrontlib/src/cms-components/cart/mini-cart/mini-cart.component.ts
  {
    class: MINI_CART_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
      {
        className: CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
    removeParams: [
      {
        className: CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
    addParams: [
      {
        className: ACTIVE_CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
  },
  // projects/storefrontlib/src/cms-components/myaccount/address-book/address-book.component.service.ts
  {
    class: ADDRESS_BOOK_COMPONENT_SERVICE,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
      {
        className: USER_ADDRESS_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
    addParams: [
      {
        className: CHECKOUT_DELIVERY_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
  },
  // projects/storefrontlib/src/cms-components/checkout/guards/checkout.guard.ts
  {
    class: CHECKOUT_GUARD,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
      {
        className: ROUTER,
        importPath: ANGULAR_ROUTER,
      },
      {
        className: CHECKOUT_CONFIG,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
      {
        className: ROUTING_CONFIG_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
    removeParams: [
      {
        className: CHECKOUT_CONFIG,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
    ],
    addParams: [
      {
        className: CHECKOUT_CONFIG_SERVICE,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
      {
        className: EXPRESS_CHECKOUT_SERVICE,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
      {
        className: ACTIVE_CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
  },
  // projects/storefrontlib/src/cms-components/checkout/components/checkout-order-summary/checkout-order-summary.component.ts
  {
    class: CHECKOUT_ORDER_SUMMARY_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
      {
        className: CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
    removeParams: [
      {
        className: CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
    addParams: [
      {
        className: ACTIVE_CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
  },
  // projects/storefrontlib/src/cms-components/checkout/components/checkout-progress/checkout-progress-mobile-top/checkout-progress-mobile-top.ts
  {
    class: CHECKOUT_PROGRESS_MOBILE_TOP_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
      {
        className: CHECKOUT_CONFIG,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
      {
        className: ROUTING_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: ROUTING_CONFIG_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
    removeParams: [
      {
        className: CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
    addParams: [
      {
        className: ACTIVE_CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
  },
  // projects/storefrontlib/src/cms-components/checkout/components/payment-method/payment-method.component.ts
  {
    class: PAYMENT_METHOD_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
      {
        className: USER_PAYMENT_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: CHECKOUT_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: CHECKOUT_DELIVERY_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: CHECKOUT_PAYMENT_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: GLOBAL_MESSAGE_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: ROUTING_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: CHECKOUT_CONFIG_SERVICE,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
      {
        className: ACTIVATED_ROUTE,
        importPath: ANGULAR_ROUTER,
      },
      {
        className: TRANSLATION_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
    addParams: [
      {
        className: ACTIVE_CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
  },
  // projects/storefrontlib/src/cms-components/checkout/guards/checkout-auth.guard.ts
  {
    class: CHECKOUT_AUTH_GUARD,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
      {
        className: ROUTING_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: AUTH_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: AUTH_REDIRECT_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: CHECKOUT_CONFIG_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
    removeParams: [
      {
        className: CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
    addParams: [
      {
        className: ACTIVE_CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
  },
  // projects/storefrontlib/cms-components/cart/cart-page-layout-handler.ts
  {
    class: CART_PAGE_LAYOUT_HANDLER,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
      {
        className: CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
    removeParams: [
      {
        className: CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
    addParams: [
      {
        className: ACTIVE_CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: SELECTIVE_CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
  },
  // projects/cds/src/profiletag/services/spartacus-event.service.ts
  {
    class: CDS_SPARTACUS_EVENT_SERVICE,
    importPath: SPARTACUS_CDS,
    deprecatedParams: [
      {
        className: CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: CONSENT_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: ROUTER,
        importPath: ANGULAR_ROUTER,
      },
      {
        className: CDS_CONFIG,
        importPath: SPARTACUS_CDS,
      },
    ],
    removeParams: [
      {
        className: CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
    addParams: [
      {
        className: ACTIVE_CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
  },
];
