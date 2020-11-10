import {
  ASM_SESSION_TIMER_COMPONENT,
  ASM_CONFIG,
  SPARTACUS_STOREFRONTLIB,
  ANGULAR_CORE,
  ASM_COMPONENT_SERVICE,
  AUTH_SERVICE,
  SPARTACUS_CORE,
  ROUTING_SERVICE,
  USER_ID_SERVICE,
  CHANGE_DETECTOR_REF,
} from '../../../../shared/constants';

import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const ASM_SESSION_TIMER_COMPONENT_MIGRATION: ConstructorDeprecation = {
  // projects\storefrontlib\src\cms-components\asm\asm-session-timer\asm-session-timer.component.ts
  class: ASM_SESSION_TIMER_COMPONENT,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
    {
      className: ASM_CONFIG,
      importPath: ANGULAR_CORE,
    },
    {
      className: ASM_COMPONENT_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
    {
      className: AUTH_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: ROUTING_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: CHANGE_DETECTOR_REF,
      importPath: ANGULAR_CORE,
    },
  ],
  removeParams: [
    {
      className: AUTH_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
  addParams: [
    {
      className: USER_ID_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
};
