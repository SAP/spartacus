/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  LOGIN_AS_GUEST,
  LOGIN_FORM_COMPONENT,
  NG_ON_DESTROY,
  SUB,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { SPARTACUS_STOREFRONTLIB } from '../../../../shared/libs-constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

// projects\storefrontlib\src\cms-components\user\login-form\login-form.component.ts
export const LOGIN_FORM_COMPONENT_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: LOGIN_FORM_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedNode: NG_ON_DESTROY,
    comment: `// ${TODO_SPARTACUS} Method '${NG_ON_DESTROY}' was removed together with the ${SUB} property`,
  },
  {
    class: LOGIN_FORM_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedNode: SUB,
    comment: `// ${TODO_SPARTACUS} property '${SUB}' was removed`,
  },
  {
    class: LOGIN_FORM_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedNode: LOGIN_AS_GUEST,
    comment: `// ${TODO_SPARTACUS} property '${LOGIN_AS_GUEST}' was removed`,
  },
];
