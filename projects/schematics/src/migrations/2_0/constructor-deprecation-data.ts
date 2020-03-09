import {
  ACTIVE_CART_SERVICE,
  AUTH_SERVICE,
  CART_DATA_SERVICE,
  CHECKOUT_DELIVERY_SERVICE,
  CHECKOUT_PAYMENT_SERVICE,
  CHECKOUT_SERVICE,
  CMS_SERVICE,
  FEATURE_CONFIG_SERVICE,
  NGRX_STORE,
  PAGE_META_RESOLVER,
  PAGE_META_SERVICE,
  SPARTACUS_CORE,
  STORE,
  USER_ADDRESS_SERVICE,
  ADDRESS_BOOK_COMPONENT_SERVICE,
  CHECKOUT_GUARD,
  SPARTACUS_STOREFRONTLIB,
  CHECKOUT_CONFIG,
  CHECKOUT_CONFIG_SERVICE,
  EXPRESS_CHECKOUT_SERVICE,
  ROUTER,
  ROUTING_CONFIG_SERVICE,
  CART_SERVICE,
  ANGULAR_ROUTER,
} from '../../shared/constants';
import { ConstructorDeprecation } from '../../shared/utils/file-utils';

export const CONSTRUCTOR_DEPRECATION_DATA: ConstructorDeprecation[] = [
  // projects/core/src/user/facade/user-address.service.ts
  {
    class: USER_ADDRESS_SERVICE,
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
  // projects/storefrontlib/src/cms-components/myaccount/address-book/address-book.component.service.spec.ts
  {
    class: ADDRESS_BOOK_COMPONENT_SERVICE,
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
      {
        className: CART_SERVICE,
        importPath: SPARTACUS_CORE,
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
];
