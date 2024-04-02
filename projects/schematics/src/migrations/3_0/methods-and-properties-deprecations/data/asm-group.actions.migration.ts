/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ASM_ACTIONS,
  LOAD_CUSTOMER_SUPPORT_AGENT_TOKEN,
  LOAD_CUSTOMER_SUPPORT_AGENT_TOKEN_CLASS,
  LOAD_CUSTOMER_SUPPORT_AGENT_TOKEN_FAIL,
  LOAD_CUSTOMER_SUPPORT_AGENT_TOKEN_FAIL_CLASS,
  LOAD_CUSTOMER_SUPPORT_AGENT_TOKEN_SUCCESS,
  LOAD_CUSTOMER_SUPPORT_AGENT_TOKEN_SUCCESS_CLASS,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { SPARTACUS_CORE } from '../../../../shared/libs-constants';
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
