import {
  CHECKOUT_CONFIG_SERVICE,
  SPARTACUS_STOREFRONTLIB,
  SPARTACUS_CORE,
  CHECKOUT_CONFIG,
  ROUTING_CONFIG_SERVICE,
} from '../../../../shared/constants_3.0';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const CHECKOUT_CONFIG_SERVICE_MIGRATION: ConstructorDeprecation = {
  // projects/storefrontlib/src/cms-components/checkout/services/checkout-config.service.ts
  class: CHECKOUT_CONFIG_SERVICE,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
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
      className: ROUTING_CONFIG_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
};