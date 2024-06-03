/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ON_SUCCESS,
  TODO_SPARTACUS,
  UPDATE_EMAIL_COMPONENT,
} from '../../../../shared/constants';
import { SPARTACUS_STOREFRONTLIB } from '../../../../shared/libs-constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

// projects/storefrontlib/cms-components/myaccount/update-email/update-email.component.ts
export const UPDATE_EMAIL_COMPONENT_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: UPDATE_EMAIL_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedNode: ON_SUCCESS,
    comment: `// ${TODO_SPARTACUS} Method '${ON_SUCCESS}' return type from '${UPDATE_EMAIL_COMPONENT}' was changed from void to 'Promise<void>'`,
  },
];
