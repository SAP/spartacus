import {
  CHECKOUT_CONFIG,
  CHECKOUT_PROGRESS_MOBILE_TOP_COMPONENT,
  ROUTING_CONFIG_SERVICE,
  ROUTING_SERVICE,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
  CHECKOUT_STEP_SERVICE,
  CHANGE_DETECTOR_REF,
  ANGULAR_CORE,
  ACTIVE_CART_SERVICE,
} from '../../../../shared/constants_3.0';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const CHECKOUT_PROGRESS_MOBILE_TOP_COMPONENT_MIGRATION: ConstructorDeprecation = {
  // projects/storefrontlib/src/cms-components/checkout/components/checkout-progress/checkout-progress-mobile-top/checkout-progress-mobile-top.component.ts
  class: CHECKOUT_PROGRESS_MOBILE_TOP_COMPONENT,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
    {
      className: CHECKOUT_CONFIG,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
    {
      className: ROUTING_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: ROUTING_CONFIG_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: ACTIVE_CART_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
  removeParams: [
    {
      className: CHECKOUT_CONFIG,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
    {
      className: ROUTING_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: ROUTING_CONFIG_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
  addParams: [
    {
      className: CHECKOUT_STEP_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
    {
      className: CHANGE_DETECTOR_REF,
      importPath: ANGULAR_CORE,
    },
  ],
};
