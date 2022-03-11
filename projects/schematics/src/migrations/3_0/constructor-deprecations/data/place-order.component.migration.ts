import {
  ANGULAR_CORE,
  ANGULAR_FORMS,
  CHECKOUT_REPLENISHMENT_FORM_SERVICE,
  CHECKOUT_SERVICE,
  FORM_BUILDER,
  LAUNCH_COMPONENT_SERVICE,
  PLACE_ORDER_COMPONENT,
  ROUTING_SERVICE,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
  VIEW_CONTAINER_REF,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const PLACE_ORDER_COMPONENT_MIGRATION: ConstructorDeprecation = {
  // projects/storefrontlib/cms-components/checkout/components/place-order/place-order.component.ts
  class: PLACE_ORDER_COMPONENT,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
    {
      className: CHECKOUT_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: ROUTING_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: FORM_BUILDER,
      importPath: ANGULAR_FORMS,
    },
  ],
  addParams: [
    {
      className: CHECKOUT_REPLENISHMENT_FORM_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
    {
      className: LAUNCH_COMPONENT_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
    {
      className: VIEW_CONTAINER_REF,
      importPath: ANGULAR_CORE,
    },
  ],
};
