import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';
import {
  PAYMENT_FORM_COMPONENT,
  SPARTACUS_STOREFRONTLIB,
  USER_ADDRESS_SERVICE,
  SPARTACUS_CORE,
  CHECKOUT_PAYMENT_SERVICE,
  CHECKOUT_DELIVERY_SERVICE,
  USER_PAYMENT_SERVICE,
  GLOBAL_MESSAGE_SERVICE,
  FORM_BUILDER,
  ANGULAR_FORMS,
  MODAL_SERVICE,
} from '../../../../shared/constants';

export const PAYMENT_FORM_COMPONENT_MIGRATION: ConstructorDeprecation = {
  class: PAYMENT_FORM_COMPONENT,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
    {
      className: CHECKOUT_PAYMENT_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: CHECKOUT_DELIVERY_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: USER_PAYMENT_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: GLOBAL_MESSAGE_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: FORM_BUILDER,
      importPath: ANGULAR_FORMS,
    },
    {
      className: MODAL_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
  ],
  addParams: [
    {
      className: USER_ADDRESS_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
};
