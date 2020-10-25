import {
  ACTIVE_CART_SERVICE,
  ANGULAR_FORMS,
  AUTH_SERVICE,
  CART_COUPON_COMPONENT,
  CART_SERVICE,
  CART_VOUCHER_SERVICE,
  CUSTOMER_COUPON_SERVICE,
  FEATURE_CONFIG_SERVICE,
  FORM_BUILDER,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

// projects/storefrontlib/src/cms-components/cart/cart-coupon/cart-coupon.component.ts
export const CART_COUPON_COMPONENT_MIGRATIONS: ConstructorDeprecation[] = [
  {
    class: CART_COUPON_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
      {
        className: CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: AUTH_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: CART_VOUCHER_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: FORM_BUILDER,
        importPath: ANGULAR_FORMS,
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
        className: CUSTOMER_COUPON_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: ACTIVE_CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
  },
  {
    class: CART_COUPON_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
      {
        className: CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: AUTH_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: CART_VOUCHER_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: FORM_BUILDER,
        importPath: ANGULAR_FORMS,
      },
      {
        className: CUSTOMER_COUPON_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: FEATURE_CONFIG_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
    removeParams: [
      {
        className: CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: AUTH_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: FEATURE_CONFIG_SERVICE,
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
  {
    class: CART_COUPON_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
      {
        className: AUTH_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: CART_VOUCHER_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: FORM_BUILDER,
        importPath: ANGULAR_FORMS,
      },
      {
        className: CUSTOMER_COUPON_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: FEATURE_CONFIG_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: ACTIVE_CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
    removeParams: [
      {
        className: AUTH_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: FEATURE_CONFIG_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
    addParams: [],
  },
];
