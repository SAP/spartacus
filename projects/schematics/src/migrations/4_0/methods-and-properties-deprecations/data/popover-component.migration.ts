/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  INSIDE_CLICKED,
  POPOVER_COMPONENT,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { SPARTACUS_STOREFRONTLIB } from '../../../../shared/libs-constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

// projects/storefrontlib/shared/components/popover/popover.component.ts

export const POPOVER_COMPONENT_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: POPOVER_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedNode: INSIDE_CLICKED,
    comment: `// ${TODO_SPARTACUS} Property '${POPOVER_COMPONENT}.${INSIDE_CLICKED}' was removed.`,
  },
];
