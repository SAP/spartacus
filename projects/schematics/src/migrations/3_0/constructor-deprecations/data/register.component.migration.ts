import {
  ANGULAR_FORMS,
  ANONYMOUS_CONSENTS_CONFIG,
  ANONYMOUS_CONSENTS_SERVICE,
  AUTH_CONFIG_SERVICE,
  FORM_BUILDER,
  GLOBAL_MESSAGE_SERVICE,
  REGISTER_COMPONENT,
  ROUTING_SERVICE,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
  USER_SERVICE,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const REGISTER_COMPONENT_MIGRATION: ConstructorDeprecation = {
  // projects/storefrontlib/cms-components/user/register/register.component.ts
  class: REGISTER_COMPONENT,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
    {
      className: USER_SERVICE,
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
      className: ROUTING_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: ANONYMOUS_CONSENTS_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: ANONYMOUS_CONSENTS_CONFIG,
      importPath: SPARTACUS_CORE,
    },
  ],
  addParams: [
    {
      className: AUTH_CONFIG_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
};
