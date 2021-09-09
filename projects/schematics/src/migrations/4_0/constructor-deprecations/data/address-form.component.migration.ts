import {
  ADDRESS_FORM_COMPONENT,
  ANGULAR_FORMS,
  CHECKOUT_DELIVERY_SERVICE,
  FORM_BUILDER,
  GLOBAL_MESSAGE_SERVICE,
  MODAL_SERVICE,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
  TRANSLATION_SERVICE,
  USER_ADDRESS_SERVICE,
  USER_SERVICE,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const ADDRESS_FORM_COMPONENT_MIGRATION_V1: ConstructorDeprecation = {
  // projects/storefrontlib/cms-components/myaccount/address-book/address-form/address-form.component.ts
  class: ADDRESS_FORM_COMPONENT,
  importPath: SPARTACUS_CORE,
  deprecatedParams: [
    { className: FORM_BUILDER, importPath: ANGULAR_FORMS },
    { className: CHECKOUT_DELIVERY_SERVICE, importPath: SPARTACUS_CORE },
    { className: USER_SERVICE, importPath: SPARTACUS_CORE },
    { className: USER_ADDRESS_SERVICE, importPath: SPARTACUS_CORE },
    { className: MODAL_SERVICE, importPath: SPARTACUS_STOREFRONTLIB },
  ],
  removeParams: [
    { className: CHECKOUT_DELIVERY_SERVICE, importPath: SPARTACUS_CORE },
  ],
};

export const ADDRESS_FORM_COMPONENT_MIGRATION_V2: ConstructorDeprecation = {
  // projects/storefrontlib/cms-components/myaccount/address-book/address-form/address-form.component.ts
  class: ADDRESS_FORM_COMPONENT,
  importPath: SPARTACUS_CORE,
  deprecatedParams: [
    { className: FORM_BUILDER, importPath: ANGULAR_FORMS },
    { className: USER_SERVICE, importPath: SPARTACUS_CORE },
    { className: USER_ADDRESS_SERVICE, importPath: SPARTACUS_CORE },
    { className: GLOBAL_MESSAGE_SERVICE, importPath: SPARTACUS_CORE },
    { className: MODAL_SERVICE, importPath: SPARTACUS_STOREFRONTLIB },
  ],
  addParams: [{ className: TRANSLATION_SERVICE, importPath: SPARTACUS_CORE }],
};
