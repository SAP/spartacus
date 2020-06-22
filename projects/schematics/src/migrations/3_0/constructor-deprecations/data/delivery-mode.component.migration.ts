import {
  DELIVERY_MODE_COMPONENT,
  ROUTING_SERVICE,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
  CHECKOUT_STEP_SERVICE,
  FORM_BUILDER,
  ANGULAR_FORMS,
  CHECKOUT_DELIVERY_SERVICE,
  CHECKOUT_CONFIG_SERVICE,
  ACTIVATED_ROUTE,
  ANGULAR_ROUTER,
} from '../../../../shared/constants_3.0';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const DELIVERY_MODE_COMPONENT_MIGRATION: ConstructorDeprecation = {
  // projects/storefrontlib/src/cms-components/checkout/components/delivery-mode/delivery-mode.component.ts
  class: DELIVERY_MODE_COMPONENT,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
    {
      className: FORM_BUILDER,
      importPath: ANGULAR_FORMS,
    },
    {
      className: CHECKOUT_DELIVERY_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: ROUTING_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: CHECKOUT_CONFIG_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
    {
      className: ACTIVATED_ROUTE,
      importPath: ANGULAR_ROUTER,
    },
  ],
  removeParams: [
    {
      className: ROUTING_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
  addParams: [
    {
      className: CHECKOUT_STEP_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
  ],
};
