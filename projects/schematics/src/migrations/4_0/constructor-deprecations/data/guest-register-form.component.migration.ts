import { SPARTACUS_CHECKOUT_COMPONENTS } from './../../../../shared/constants';
import {
  GUEST_REGISTER_FORM_COMPONENT,
  SPARTACUS_CORE,
  SPARTACUS_USER_PROFILE_ROOT,
  USER_REGISTER_FACADE,
  USER_SERVICE,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const GUEST_REGISTER_FORM_COMPONENT_MIGRATION: ConstructorDeprecation = {
  // feature-libs/checkout/components/order-confirmation/components/guest-register-form/guest-register-form.component.ts
  class: GUEST_REGISTER_FORM_COMPONENT,
  importPath: SPARTACUS_CHECKOUT_COMPONENTS,
  deprecatedParams: [{ className: USER_SERVICE, importPath: SPARTACUS_CORE }],
  addParams: [
    {
      className: USER_REGISTER_FACADE,
      importPath: SPARTACUS_USER_PROFILE_ROOT,
    },
  ],
};
