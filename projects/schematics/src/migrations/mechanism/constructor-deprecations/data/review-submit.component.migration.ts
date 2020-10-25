import {
  ACTIVE_CART_SERVICE,
  CART_SERVICE,
  CHECKOUT_CONFIG_SERVICE,
  CHECKOUT_DELIVERY_SERVICE,
  CHECKOUT_PAYMENT_SERVICE,
  PROMOTION_SERVICE,
  REVIEW_SUBMIT_COMPONENT,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
  TRANSLATION_SERVICE,
  USER_ADDRESS_SERVICE,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';
// projects/storefrontlib/src/cms-components/checkout/components/review-submit/review-submit.component.ts
export const REVIEW_SUBMIT_COMPONENT_MIGRATIONS: ConstructorDeprecation[] = [
  {
    class: REVIEW_SUBMIT_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
      {
        className: CHECKOUT_DELIVERY_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: CHECKOUT_PAYMENT_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: USER_ADDRESS_SERVICE,
        importPath: SPARTACUS_CORE,
      },
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
      {
        className: TRANSLATION_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: CHECKOUT_CONFIG_SERVICE,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
      {
        className: PROMOTION_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
  },
  {
    class: REVIEW_SUBMIT_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
      {
        className: CHECKOUT_DELIVERY_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: CHECKOUT_PAYMENT_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: USER_ADDRESS_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: TRANSLATION_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: CHECKOUT_CONFIG_SERVICE,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
    ],
    removeParams: [
      {
        className: CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: TRANSLATION_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: CHECKOUT_CONFIG_SERVICE,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
    ],
    addParams: [
      {
        className: ACTIVE_CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: TRANSLATION_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: CHECKOUT_CONFIG_SERVICE,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
      {
        className: PROMOTION_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
  },
  {
    class: REVIEW_SUBMIT_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
      {
        className: CHECKOUT_DELIVERY_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: CHECKOUT_PAYMENT_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: USER_ADDRESS_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: TRANSLATION_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: CHECKOUT_CONFIG_SERVICE,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
      {
        className: PROMOTION_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
    removeParams: [
      {
        className: CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: TRANSLATION_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: CHECKOUT_CONFIG_SERVICE,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
      {
        className: PROMOTION_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
    addParams: [
      {
        className: ACTIVE_CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: TRANSLATION_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: CHECKOUT_CONFIG_SERVICE,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
      {
        className: PROMOTION_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
  },
];
