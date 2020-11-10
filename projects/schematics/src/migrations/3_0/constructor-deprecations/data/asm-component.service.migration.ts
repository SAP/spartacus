import {
  ASM_COMPONENT_SERVICE,
  SPARTACUS_STOREFRONTLIB,
  AUTH_SERVICE,
  SPARTACUS_CORE,
  ASM_AUTH_SERVICE,
  ROUTING_SERVICE,
  WINDOW_REF,
  CS_AGENT_AUTH_SERVICE,
} from '../../../../shared/constants';

import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const ASM_COMPONENT_SERVICE_MIGRATION: ConstructorDeprecation = {
  // projects\storefrontlib\src\cms-components\asm\services\asm-component.service.ts
  class: ASM_COMPONENT_SERVICE,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
    {
      className: AUTH_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: ASM_AUTH_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: ROUTING_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: WINDOW_REF,
      importPath: SPARTACUS_CORE,
    },
  ],
  removeParams: [
    {
      className: ASM_AUTH_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: ROUTING_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
  addParams: [
    {
      className: CS_AGENT_AUTH_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
};
