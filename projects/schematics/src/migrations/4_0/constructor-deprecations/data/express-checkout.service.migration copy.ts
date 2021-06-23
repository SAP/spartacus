import {
  CLEAR_CHECKOUT_FACADE,
  CLEAR_CHECKOUT_SERVICE,
  EXPRESS_CHECKOUT_SERVICE,
  SPARTACUS_CHECKOUT_CORE,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const EXPRESS_CHECKOUT_SERVICE_CONSTRUCTOR_DEPRECATION: ConstructorDeprecation = {
  // feature-libs/checkout/components/services/express-checkout.service.ts
  class: EXPRESS_CHECKOUT_SERVICE,
  importPath: SPARTACUS_CHECKOUT_CORE,
  deprecatedParams: [],
  removeParams: [
    { className: CLEAR_CHECKOUT_SERVICE, importPath: SPARTACUS_CHECKOUT_CORE },
  ],
  addParams: [
    { className: CLEAR_CHECKOUT_FACADE, importPath: SPARTACUS_CHECKOUT_CORE },
  ],
};
