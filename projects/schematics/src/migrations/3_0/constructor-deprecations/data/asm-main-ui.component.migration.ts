import {
  SPARTACUS_STOREFRONTLIB,
  SPARTACUS_CORE,
  AUTH_SERVICE,
  USER_SERVICE,
  GLOBAL_MESSAGE_SERVICE,
  ROUTING_SERVICE,
  ASM_MAIN_UI_COMPONENT,
  ASM_AUTH_SERVICE,
  ASM_COMPONENT_SERVICE,
  ASM_SERVICE,
  CS_AGENT_AUTH_SERVICE,
} from '../../../../shared/constants';

import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const ASM_MAIN_UI_COMPONENT_MIGRATION: ConstructorDeprecation = {
  // projects\storefrontlib\src\cms-components\asm\asm-main-ui\asm-main-ui.component.ts
  class: ASM_MAIN_UI_COMPONENT,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
    {
      className: ASM_AUTH_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: AUTH_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: USER_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: ASM_COMPONENT_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
    {
      className: GLOBAL_MESSAGE_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: ROUTING_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: ASM_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
  removeParams: [
    {
      className: ASM_AUTH_SERVICE,
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
