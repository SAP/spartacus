/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { PRODUCT_SERVICE, TODO_SPARTACUS } from '../../../../shared/constants';
import { SPARTACUS_CORE } from '../../../../shared/libs-constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

// projects/core/src/product/facade/product.service.ts
export const PRODUCT_SERVICE_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: PRODUCT_SERVICE,
    importPath: SPARTACUS_CORE,
    deprecatedNode: `reload`,
    comment: `// ${TODO_SPARTACUS} Method '${PRODUCT_SERVICE}.reload' was removed. Please use the reloading triggers configuration instead (see https://sap.github.io/spartacus-docs/loading-scopes/#reloading-triggers for more).`,
  },
];
