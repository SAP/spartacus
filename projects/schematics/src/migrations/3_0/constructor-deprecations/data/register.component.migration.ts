import {
  REGISTER_COMPONENT,
  SPARTACUS_STOREFRONTLIB,
  ANONYMOUS_CONSENTS_SERVICE,
  ANONYMOUS_CONSENTS_CONFIG,
  AUTH_CONFIG_SERVICE,
  FORM_BUILDER,
  ANGULAR_FORMS,
  ROUTING_SERVICE,
  SPARTACUS_CORE
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const REGISTER_COMPONENT_MIGRATION: ConstructorDeprecation = {
  // projects/storefrontlib/src/cms-components/user/register/register.component.ts
  class: REGISTER_COMPONENT,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
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
    }
  ],
};
