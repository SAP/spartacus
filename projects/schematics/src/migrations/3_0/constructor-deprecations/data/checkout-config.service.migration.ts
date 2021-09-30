import {
  CHECKOUT_CONFIG,
  CHECKOUT_CONFIG_SERVICE,
  ROUTING_CONFIG_SERVICE,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const CHECKOUT_CONFIG_SERVICE_MIGRATION: ConstructorDeprecation = {
  // projects/storefrontlib/cms-components/checkout/services/checkout-config.service.ts
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
