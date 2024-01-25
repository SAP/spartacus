/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  NAVIGATION_UI_COMPONENT,
  REINITALIZE_MENU,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { SPARTACUS_STOREFRONTLIB } from '../../../../shared/libs-constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

export const NAVIGATION_UI_COMPONENT_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: NAVIGATION_UI_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedNode: REINITALIZE_MENU,
    comment: `// ${TODO_SPARTACUS} Method '${NAVIGATION_UI_COMPONENT}.${REINITALIZE_MENU}' was removed. Use 'reinitializeMenu' instead.`,
  },
];
