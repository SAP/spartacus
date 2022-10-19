/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
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
    comment: `// ${TODO_SPARTACUS} Method '${PRODUCT_SERVICE}.reload' was removed. Please use the reloading triggers configuration instead (see [Reloading Triggers](https://help.sap.com/docs/SAP_COMMERCE_COMPOSABLE_STOREFRONT/bfcbe6fa26f94035b67979f0053f9bee/3128ae8ce1cd4108b5c408768d85fd9c.html#loio2b649279eb6b46f2bd51acebc6ac9d33) for more).`,
  },
];
