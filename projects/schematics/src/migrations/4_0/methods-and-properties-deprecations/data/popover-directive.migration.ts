/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  HANDLE_OPEN,
  POPOVER_DIRECTIVE,
  TODO_SPARTACUS,
  TOGGLE,
} from '../../../../shared/constants';
import { SPARTACUS_STOREFRONTLIB } from '../../../../shared/libs-constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

// projects/storefrontlib/shared/components/popover/popover.directive.ts

export const POPOVER_DIRECTIVE_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: POPOVER_DIRECTIVE,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedNode: HANDLE_OPEN,
    comment: `// ${TODO_SPARTACUS} Method '${POPOVER_DIRECTIVE}.${HANDLE_OPEN}' was removed, use methods 'handleEscape', 'handleClick', 'handlePress', 'handleTab' instead.`,
  },
  {
    class: POPOVER_DIRECTIVE,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedNode: TOGGLE,
    comment: `// ${TODO_SPARTACUS} Method '${POPOVER_DIRECTIVE}.${TOGGLE}' was removed, use methods 'handleEscape', 'handleClick', 'handlePress', 'handleTab' instead.`,
  },
];
