import {
  PLACE_ORDER_COMPONENT,
  SPARTACUS_STOREFRONTLIB,
  CHECKOUT_SERVICE,
  SPARTACUS_CORE,
  ROUTING_SERVICE,
  FORM_BUILDER,
  ANGULAR_FORMS,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const PLACE_ORDER_COMPONENT_MIGRATION: ConstructorDeprecation = {
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
  ],
  addParams: [
    {
      className: FORM_BUILDER,
      importPath: ANGULAR_FORMS,
    },
  ],
};
