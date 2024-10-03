/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  DYNAMIC_ATTRIBUTE_SERVICE,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { SPARTACUS_CORE } from '../../../../shared/libs-constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

// projects/core/src/cms/services/dynamic-attribute.service.ts
export const DYNAMIC_ATTRIBUTE_SERVICE_MIGRATION: MethodPropertyDeprecation[] =
  [
    {
      class: DYNAMIC_ATTRIBUTE_SERVICE,
      importPath: SPARTACUS_CORE,
      deprecatedNode: `addDynamicAttributes`,
      comment: `// ${TODO_SPARTACUS} '${DYNAMIC_ATTRIBUTE_SERVICE}.addDynamicAttributes' method was removed. Please use functions 'addAttributesToComponent' or 'addAttributesToSlot' instead`,
    },
  ];
