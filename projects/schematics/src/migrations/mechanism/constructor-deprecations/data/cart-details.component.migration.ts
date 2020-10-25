import {
  ACTIVE_CART_SERVICE,
  AUTH_SERVICE,
  CART_DETAILS_COMPONENT,
  CART_SERVICE,
  FEATURE_CONFIG_SERVICE,
  PROMOTION_SERVICE,
  ROUTING_SERVICE,
  SELECTIVE_CART_SERVICE,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';
// projects/storefrontlib/src/cms-components/cart/cart-details/cart-details.component.ts
export const CART_DETAILS_COMPONENT_MIGRATIONS: ConstructorDeprecation[] = [
  {
    class: CART_DETAILS_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
      {
        className: CART_SERVICE,
        importPath: SPARTACUS_CORE,
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
        className: ACTIVE_CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: PROMOTION_SERVICE,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
      {
        className: SELECTIVE_CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: AUTH_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: ROUTING_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
  },
  {
    class: CART_DETAILS_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
      {
        className: CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: PROMOTION_SERVICE,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
      {
        className: SELECTIVE_CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: AUTH_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: ROUTING_SERVICE,
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
        className: PROMOTION_SERVICE,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
      {
        className: SELECTIVE_CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: AUTH_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: ROUTING_SERVICE,
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
      {
        className: PROMOTION_SERVICE,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
      {
        className: SELECTIVE_CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: AUTH_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: ROUTING_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
  },
  {
    class: CART_DETAILS_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
      {
        className: ACTIVE_CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: PROMOTION_SERVICE,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
      {
        className: SELECTIVE_CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: AUTH_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: ROUTING_SERVICE,
        importPath: SPARTACUS_CORE,
      },
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
];
