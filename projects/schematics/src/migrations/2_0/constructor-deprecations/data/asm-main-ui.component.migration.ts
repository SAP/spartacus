import {
  ASM_AUTH_SERVICE,
  ASM_COMPONENT_SERVICE,
  ASM_MAIN_UI_COMPONENT,
  ASM_SERVICE,
  AUTH_SERVICE,
  GLOBAL_MESSAGE_SERVICE,
  ROUTING_SERVICE,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
  USER_SERVICE,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const ASM_MAIN_UI_COMPONENT_MIGRATION: ConstructorDeprecation = {
  // projects/storefrontlib/src/cms-components/asm/asm-main-ui/asm-main-ui.component.ts
  class: ASM_MAIN_UI_COMPONENT,
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
  ],
  addParams: [
    {
      className: ASM_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
};
