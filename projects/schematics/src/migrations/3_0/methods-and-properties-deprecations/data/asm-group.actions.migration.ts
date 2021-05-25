import {
  ASM_ACTIONS,
  LOAD_CUSTOMER_SUPPORT_AGENT_TOKEN,
  LOAD_CUSTOMER_SUPPORT_AGENT_TOKEN_CLASS,
  LOAD_CUSTOMER_SUPPORT_AGENT_TOKEN_FAIL,
  LOAD_CUSTOMER_SUPPORT_AGENT_TOKEN_FAIL_CLASS,
  LOAD_CUSTOMER_SUPPORT_AGENT_TOKEN_SUCCESS,
  LOAD_CUSTOMER_SUPPORT_AGENT_TOKEN_SUCCESS_CLASS,
  SPARTACUS_CORE,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

export const ASM_ACTIONS_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: ASM_ACTIONS,
    importPath: SPARTACUS_CORE,
    deprecatedNode: LOAD_CUSTOMER_SUPPORT_AGENT_TOKEN,
    comment: `// ${TODO_SPARTACUS} Variable removed. Instead use methods from 'CsAgentAuthService'.`,
  },
  {
    class: ASM_ACTIONS,
    importPath: SPARTACUS_CORE,
    deprecatedNode: LOAD_CUSTOMER_SUPPORT_AGENT_TOKEN_FAIL,
    comment: `// ${TODO_SPARTACUS} Variable removed. Instead use methods from 'CsAgentAuthService'.`,
  },
  {
    class: ASM_ACTIONS,
    importPath: SPARTACUS_CORE,
    deprecatedNode: LOAD_CUSTOMER_SUPPORT_AGENT_TOKEN_SUCCESS,
    comment: `// ${TODO_SPARTACUS} Variable removed. Instead use methods from 'CsAgentAuthService'.`,
  },
  {
    class: ASM_ACTIONS,
    importPath: SPARTACUS_CORE,
    deprecatedNode: LOAD_CUSTOMER_SUPPORT_AGENT_TOKEN_CLASS,
    comment: `// ${TODO_SPARTACUS} Action removed. Instead use methods from 'CsAgentAuthService'.`,
  },
  {
    class: ASM_ACTIONS,
    importPath: SPARTACUS_CORE,
    deprecatedNode: LOAD_CUSTOMER_SUPPORT_AGENT_TOKEN_FAIL_CLASS,
    comment: `// ${TODO_SPARTACUS} Action removed. Instead use methods from 'CsAgentAuthService'.`,
  },
  {
    class: ASM_ACTIONS,
    importPath: SPARTACUS_CORE,
    deprecatedNode: LOAD_CUSTOMER_SUPPORT_AGENT_TOKEN_SUCCESS_CLASS,
    comment: `// ${TODO_SPARTACUS} Action removed. Instead use methods from 'CsAgentAuthService'.`,
  },
];
