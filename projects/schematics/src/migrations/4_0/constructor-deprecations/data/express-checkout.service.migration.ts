import {
  CHECKOUT_CONFIG_SERVICE,
  CHECKOUT_DELIVERY_FACADE,
  CHECKOUT_DELIVERY_SERVICE,
  CHECKOUT_DETAILS_SERVICE,
  CHECKOUT_PAYMENT_FACADE,
  CHECKOUT_PAYMENT_SERVICE,
  CLEAR_CHECKOUT_FACADE,
  CLEAR_CHECKOUT_SERVICE,
  EXPRESS_CHECKOUT_SERVICE,
  SPARTACUS_CHECKOUT_COMPONENTS,
  SPARTACUS_CHECKOUT_CORE,
  SPARTACUS_CHECKOUT_ROOT,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
  USER_ADDRESS_SERVICE,
  USER_PAYMENT_SERVICE,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const EXPRESS_CHECKOUT_SERVICE_MIGRATION_V1: ConstructorDeprecation = {
  // feature-libs/checkout/components/services/express-checkout.service.ts
  class: EXPRESS_CHECKOUT_SERVICE,
  importPath: SPARTACUS_CHECKOUT_CORE,
  deprecatedParams: [
    {
      className: USER_ADDRESS_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: USER_PAYMENT_SERVICE,
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
      className: CHECKOUT_DETAILS_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
    {
      className: CHECKOUT_CONFIG_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
  ],
  removeParams: [
    {
      className: CHECKOUT_DELIVERY_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: CHECKOUT_PAYMENT_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: CHECKOUT_DETAILS_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
    {
      className: CHECKOUT_CONFIG_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
  ],
  addParams: [
    {
      className: CHECKOUT_DELIVERY_FACADE,
      importPath: SPARTACUS_CHECKOUT_ROOT,
    },
    {
      className: CHECKOUT_PAYMENT_FACADE,
      importPath: SPARTACUS_CHECKOUT_ROOT,
    },
    {
      className: CHECKOUT_DETAILS_SERVICE,
      importPath: SPARTACUS_CHECKOUT_COMPONENTS,
    },
    {
      className: CHECKOUT_CONFIG_SERVICE,
      importPath: SPARTACUS_CHECKOUT_COMPONENTS,
    },
    {
      className: CLEAR_CHECKOUT_FACADE,
      importPath: SPARTACUS_CHECKOUT_ROOT,
    },
  ],
};

export const EXPRESS_CHECKOUT_SERVICE_MIGRATION_V2: ConstructorDeprecation = {
  // feature-libs/checkout/components/services/express-checkout.service.ts
  class: EXPRESS_CHECKOUT_SERVICE,
  importPath: SPARTACUS_CHECKOUT_CORE,
  deprecatedParams: [
    {
      className: USER_ADDRESS_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: USER_PAYMENT_SERVICE,
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
      className: CHECKOUT_DETAILS_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
    {
      className: CHECKOUT_CONFIG_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
    {
      className: CLEAR_CHECKOUT_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
  removeParams: [
    {
      className: CHECKOUT_DELIVERY_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: CHECKOUT_PAYMENT_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: CHECKOUT_DETAILS_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
    {
      className: CHECKOUT_CONFIG_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
    {
      className: CLEAR_CHECKOUT_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
  addParams: [
    {
      className: CHECKOUT_DELIVERY_FACADE,
      importPath: SPARTACUS_CHECKOUT_ROOT,
    },
    {
      className: CHECKOUT_PAYMENT_FACADE,
      importPath: SPARTACUS_CHECKOUT_ROOT,
    },
    {
      className: CHECKOUT_DETAILS_SERVICE,
      importPath: SPARTACUS_CHECKOUT_COMPONENTS,
    },
    {
      className: CHECKOUT_CONFIG_SERVICE,
      importPath: SPARTACUS_CHECKOUT_COMPONENTS,
    },
    {
      className: CLEAR_CHECKOUT_FACADE,
      importPath: SPARTACUS_CHECKOUT_ROOT,
    },
  ],
};
