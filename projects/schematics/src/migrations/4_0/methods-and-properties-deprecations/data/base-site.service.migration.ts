/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  BASE_SITE_SERVICE,
  INITIALIZE,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { SPARTACUS_CORE } from '../../../../shared/libs-constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

// projects/core/src/site-context/facade/base-site.service.ts
export const BASE_SITE_SERVICE_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: BASE_SITE_SERVICE,
    importPath: SPARTACUS_CORE,
    deprecatedNode: INITIALIZE,
    comment: `// ${TODO_SPARTACUS} Method '${BASE_SITE_SERVICE}.${INITIALIZE}' was removed. The state initialization is done with the 'BaseSiteInitializer' .`,
  },
];
