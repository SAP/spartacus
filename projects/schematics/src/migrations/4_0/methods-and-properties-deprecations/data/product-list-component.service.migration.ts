/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  DEFAULT_PAGE_SIZE,
  PRODUCT_LIST_COMPONENT_SERVICE,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { SPARTACUS_STOREFRONTLIB } from '../../../../shared/libs-constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

// projects/storefrontlib/cms-components/product/product-list/container/product-list-component.service.ts

export const PRODUCT_LIST_COMPONENT_SERVICE_MIGRATION: MethodPropertyDeprecation[] =
  [
    {
      class: PRODUCT_LIST_COMPONENT_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
      deprecatedNode: DEFAULT_PAGE_SIZE,
      comment: `// ${TODO_SPARTACUS} Property '${PRODUCT_LIST_COMPONENT_SERVICE}.${DEFAULT_PAGE_SIZE}' was removed, to modify default page size use 'view.defaultPageSize' configuration property.`,
    },
  ];
