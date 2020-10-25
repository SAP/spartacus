import {
  ANONYMOUS_CONSENTS_CONFIG,
  ANONYMOUS_CONSENTS_SERVICE,
  AUTH_SERVICE,
  CONSENT_MANAGEMENT_COMPONENT,
  GLOBAL_MESSAGE_SERVICE,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
  USER_CONSENT_SERVICE,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const CONSENT_MANAGEMENT_COMPONENT_MIGRATION: ConstructorDeprecation = {
  // projects/storefrontlib/src/cms-components/myaccount/consent-management/components/consent-management.component.ts
  class: CONSENT_MANAGEMENT_COMPONENT,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
    {
      className: USER_CONSENT_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: GLOBAL_MESSAGE_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
  addParams: [
    { className: ANONYMOUS_CONSENTS_CONFIG, importPath: SPARTACUS_CORE },
    {
      className: ANONYMOUS_CONSENTS_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: AUTH_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
};
