import {
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
  REGISTER_COMPONENT,
  AUTH_SERVICE,
  AUTH_REDIRECT_SERVICE,
  ROUTING_SERVICE,
  ANONYMOUS_CONSENTS_SERVICE,
  ANONYMOUS_CONSENTS_CONFIG,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';
// projects/storefrontlib/src/cms-components/user/register/register.component.ts
export const REGISTER_COMPONENT_MIGRATIONS: ConstructorDeprecation[] = [
  {
    class: REGISTER_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
      {
        className: AUTH_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: AUTH_REDIRECT_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
    removeParams: [
      {
        className: AUTH_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: AUTH_REDIRECT_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
    addParams: [
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
  },
];
