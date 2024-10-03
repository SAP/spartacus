/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CLIK_EVENT,
  PROGRESS_BUTTON_COMPONENT,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { SPARTACUS_STOREFRONTLIB } from '../../../../shared/libs-constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

// projects/storefrontlib/shared/components/progress-button/progress-button.component.ts
export const PROGRESS_BUTTON_COMPONENT_MIGRATION: MethodPropertyDeprecation[] =
  [
    {
      class: PROGRESS_BUTTON_COMPONENT,
      importPath: SPARTACUS_STOREFRONTLIB,
      deprecatedNode: CLIK_EVENT,
      comment: `// ${TODO_SPARTACUS} Output '${CLIK_EVENT}' has been renamed to '${CLIK_EVENT}' (typo).`,
    },
  ];
