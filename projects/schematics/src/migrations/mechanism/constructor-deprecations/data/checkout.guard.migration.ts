import {
  ACTIVE_CART_SERVICE,
  ANGULAR_ROUTER,
  CART_SERVICE,
  CHECKOUT_CONFIG,
  CHECKOUT_CONFIG_SERVICE,
  CHECKOUT_GUARD,
  EXPRESS_CHECKOUT_SERVICE,
  ROUTER,
  ROUTING_CONFIG_SERVICE,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const CHECKOUT_GUARD_MIGRATIONS: ConstructorDeprecation[] = [
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
      {
        className: CHECKOUT_CONFIG_SERVICE,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
      {
        className: EXPRESS_CHECKOUT_SERVICE,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
      {
        className: CART_SERVICE,
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
        className: ACTIVE_CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
  },
];
