import {
  ACTIVE_CART_SERVICE,
  CHECKOUT_CONFIG_SERVICE,
  CHECKOUT_COST_CENTER_SERVICE,
  CHECKOUT_DELIVERY_SERVICE,
  CHECKOUT_PAYMENT_SERVICE,
  CHECKOUT_STEP_SERVICE,
  PAYMENT_TYPE_SERVICE,
  PROMOTION_SERVICE,
  REVIEW_SUBMIT_COMPONENT,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
  TRANSLATION_SERVICE,
  USER_ADDRESS_SERVICE,
  USER_COST_CENTER_SERVICE,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const REVIEW_SUBMIT_COMPONENT_MIGRATION: ConstructorDeprecation = {
  // projects/storefrontlib/cms-components/checkout/components/review-submit/review-submit.component.ts
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
      importPath: SPARTACUS_STOREFRONTLIB,
    },
  ],
  removeParams: [
    {
      className: CHECKOUT_CONFIG_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
  ],
  addParams: [
    {
      className: CHECKOUT_STEP_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
    {
      className: PAYMENT_TYPE_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: CHECKOUT_COST_CENTER_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: USER_COST_CENTER_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
};
