import {
  ASM_SELECTORS,
  GET_CUSTOMER_AGENT_TOKEN,
  GET_CUSTOMER_AGENT_TOKEN_LOADING,
  GET_CUSTOMER_AGENT_TOKEN_STATE,
  SPARTACUS_CORE,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

export const ASM_SELECTORS_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: ASM_SELECTORS,
    importPath: SPARTACUS_CORE,
    deprecatedNode: GET_CUSTOMER_AGENT_TOKEN,
    comment: `// ${TODO_SPARTACUS} To get token use 'AuthStorageService.getToken' and 'AsmAuthStorageService.getTokenTarget' to check if it belongs to CS agent.`,
  },
  {
    class: ASM_SELECTORS,
    importPath: SPARTACUS_CORE,
    deprecatedNode: GET_CUSTOMER_AGENT_TOKEN_STATE,
    comment: `// ${TODO_SPARTACUS} To get token use 'AuthStorageService.getToken' and 'AsmAuthStorageService.getTokenTarget' to check if it belongs to CS agent.`,
  },
  {
    class: ASM_SELECTORS,
    importPath: SPARTACUS_CORE,
    deprecatedNode: GET_CUSTOMER_AGENT_TOKEN_LOADING,
    comment: `// ${TODO_SPARTACUS} Currently there isn't replacement for this selector in core spartacus.`,
  },
];
