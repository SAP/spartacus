import {
  ASM_AUTH_SERVICE,
  SPARTACUS_CORE,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

export const ASM_AUTH_SERVICE_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: ASM_AUTH_SERVICE,
    importPath: SPARTACUS_CORE,
    deprecatedNode: `authorizeCustomerSupportAgent`,
    comment: `// ${TODO_SPARTACUS} 'authorizeCustomerSupportAgent' method was moved to 'CsAgentAuthService' and returns Promise that will resolve when login procedure completes.`,
  },
  {
    class: ASM_AUTH_SERVICE,
    importPath: SPARTACUS_CORE,
    deprecatedNode: `startCustomerEmulationSession`,
    comment: `// ${TODO_SPARTACUS} 'startCustomerEmulationSession' method was moved to 'CsAgentAuthService'.`,
  },
  {
    class: ASM_AUTH_SERVICE,
    importPath: SPARTACUS_CORE,
    deprecatedNode: `isCustomerEmulationToken`,
    comment: `// ${TODO_SPARTACUS} 'isCustomerEmulationToken' method was removed. To check for who token belongs it's better to use 'AsmAuthStorageService.getTokenTarget' method.`,
  },
  {
    class: ASM_AUTH_SERVICE,
    importPath: SPARTACUS_CORE,
    deprecatedNode: `getCustomerSupportAgentToken`,
    comment: `// ${TODO_SPARTACUS} 'getCustomerSupportAgentToken' method was removed. You should not directly interact with token outside of AsmModule. If you still need the token use 'AuthStorageService.getToken' and 'AsmAuthStorageService.getTokenTarget'.`,
  },
  {
    class: ASM_AUTH_SERVICE,
    importPath: SPARTACUS_CORE,
    deprecatedNode: `getCustomerSupportAgentTokenLoading`,
    comment: `// ${TODO_SPARTACUS} 'getCustomerSupportAgentTokenLoading' method was moved to 'CsAgentAuthService'. Warning: it is not yet implemented there!`,
  },
  {
    class: ASM_AUTH_SERVICE,
    importPath: SPARTACUS_CORE,
    deprecatedNode: `logoutCustomerSupportAgent`,
    comment: `// ${TODO_SPARTACUS} 'logoutCustomerSupportAgent' method was moved to 'CsAgentAuthService'.`,
  },
];
