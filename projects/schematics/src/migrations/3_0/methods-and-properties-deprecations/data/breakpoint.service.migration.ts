/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  BREAKPOINT_SERVICE,
  GET_BREAKPOINT,
  GET_CLOSEST,
  GET_WINDOW,
  TODO_SPARTACUS,
  WINDOW_REF,
} from '../../../../shared/constants';
import { SPARTACUS_STOREFRONTLIB } from '../../../../shared/libs-constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

// projects/storefrontlib/layout/breakpoint/breakpoint.service.ts
export const BREAKPOINT_SERVICE_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: BREAKPOINT_SERVICE,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedNode: GET_WINDOW,
    comment: `// ${TODO_SPARTACUS} Getter method of property '${GET_WINDOW}' was removed from '${BREAKPOINT_SERVICE}'. Instead use '${WINDOW_REF}' directly.`,
  },
  {
    class: BREAKPOINT_SERVICE,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedNode: GET_CLOSEST,
    comment: `// ${TODO_SPARTACUS} Method '${GET_CLOSEST}' was removed from '${BREAKPOINT_SERVICE}'. Instead use the method '${GET_BREAKPOINT}' in '${BREAKPOINT_SERVICE}'.`,
  },
];
