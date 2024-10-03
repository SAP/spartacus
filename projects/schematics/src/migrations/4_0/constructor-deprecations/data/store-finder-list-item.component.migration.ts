/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  STORE_DATA_SERVICE,
  STORE_FINDER_LIST_ITEM_COMPONENT,
  STORE_FINDER_SERVICE,
} from '../../../../shared/constants';
import { SPARTACUS_STOREFINDER } from '../../../../shared/libs-constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const STORE_FINDER_LIST_ITEM_COMPONENT_MIGRATION: ConstructorDeprecation =
  {
    // feature-libs/storefinder/components/store-finder-list-item/store-finder-list-item.component.ts
    class: STORE_FINDER_LIST_ITEM_COMPONENT,
    importPath: SPARTACUS_STOREFINDER,
    deprecatedParams: [
      {
        className: STORE_DATA_SERVICE,
        importPath: SPARTACUS_STOREFINDER,
      },
    ],
    removeParams: [
      {
        className: STORE_DATA_SERVICE,
        importPath: SPARTACUS_STOREFINDER,
      },
    ],
    addParams: [
      {
        className: STORE_FINDER_SERVICE,
        importPath: SPARTACUS_STOREFINDER,
      },
    ],
  };
