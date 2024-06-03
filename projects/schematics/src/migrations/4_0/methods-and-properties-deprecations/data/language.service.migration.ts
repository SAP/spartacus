/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  INITIALIZE,
  LANGUAGE_SERVICE,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { SPARTACUS_CORE } from '../../../../shared/libs-constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

// projects/core/src/site-context/facade/language.service.ts
export const LANGUAGE_SERVICE_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: LANGUAGE_SERVICE,
    importPath: SPARTACUS_CORE,
    deprecatedNode: INITIALIZE,
    comment: `// ${TODO_SPARTACUS} Method '${LANGUAGE_SERVICE}.${INITIALIZE}' was removed. The state initialization is done with the 'LanguageInitializer' .`,
  },
];
