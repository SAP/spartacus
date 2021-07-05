import {
  CHECKOUT_CONFIG_SERVICE,
  CHECKOUT_DELIVERY_FACADE,
  CHECKOUT_DETAILS_SERVICE,
  CHECKOUT_PAYMENT_FACADE,
  CLEAR_CHECKOUT_FACADE,
  EXPRESS_CHECKOUT_SERVICE,
  SPARTACUS_CHECKOUT_COMPONENTS,
  SPARTACUS_CHECKOUT_ROOT,
  SPARTACUS_CORE,
  USER_ADDRESS_SERVICE,
  USER_PAYMENT_SERVICE,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const EXPRESS_CHECKOUT_SERVICE_MIGRATION: ConstructorDeprecation = {
  // feature-libs/checkout/components/services/express-checkout.service.ts
  class: EXPRESS_CHECKOUT_SERVICE,
  importPath: SPARTACUS_CHECKOUT_COMPONENTS,
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
  ],
  addParams: [
    {
      className: CLEAR_CHECKOUT_FACADE,
      importPath: SPARTACUS_CHECKOUT_ROOT,
    },
  ],
};
