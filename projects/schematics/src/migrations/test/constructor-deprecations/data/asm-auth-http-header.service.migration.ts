import {
  ASM_AUTH_HTTP_HEADER_SERVICE,
  AUTH_REDIRECT_SERVICE,
  AUTH_SERVICE,
  AUTH_STORAGE_SERVICE,
  CS_AGENT_AUTH_SERVICE,
  GLOBAL_MESSAGE_SERVICE,
  OAUTH_LIB_WRAPPER_SERVICE,
  OCC_ENDPOINTS_SERVICE,
  ROUTING_SERVICE,
  SPARTACUS_ASM,
  SPARTACUS_CORE,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const ASM_AUTH_HTTP_HEADER_SERVICE_MIGRATION: ConstructorDeprecation = {
  // feature-libs/asm/root/services/asm-auth-http-header.service.ts
  class: ASM_AUTH_HTTP_HEADER_SERVICE,
  importPath: `${SPARTACUS_ASM}/root`,
  deprecatedParams: [
    {
      className: AUTH_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: AUTH_STORAGE_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: CS_AGENT_AUTH_SERVICE,
      importPath: `${SPARTACUS_ASM}/root`,
    },
    {
      className: OAUTH_LIB_WRAPPER_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: ROUTING_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: GLOBAL_MESSAGE_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: OCC_ENDPOINTS_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
  addParams: [
    {
      className: AUTH_REDIRECT_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
};
