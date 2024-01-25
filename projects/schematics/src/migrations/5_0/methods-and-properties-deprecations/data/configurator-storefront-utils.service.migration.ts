/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CONFIGURATOR_IS_IN_VIEWPORT,
  CONFIGURATOR_STOREFRONT_UTILS_SERVICE,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED } from '../../../../shared/libs-constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

// feature-libs/product-configurator/rulebased/components/service/configurator-storefront-utils.service.ts
export const CONFIGURATOR_STOREFRONT_UTILS_SERVICE_MIGRATION: MethodPropertyDeprecation[] =
  [
    {
      class: CONFIGURATOR_STOREFRONT_UTILS_SERVICE,
      importPath: SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
      deprecatedNode: CONFIGURATOR_IS_IN_VIEWPORT,
      comment: `// ${TODO_SPARTACUS} Method '${CONFIGURATOR_STOREFRONT_UTILS_SERVICE}.${CONFIGURATOR_IS_IN_VIEWPORT}' was removed. It is not needed anymore as scrolling is always executed on navigation regardless of position of element.`,
    },
  ];
