/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  STORE_DATA_SERVICE,
  STORE_FINDER_SERVICE,
  STORE_FINDER_STORE_DESCRIPTION_COMPONENT,
} from '../../../../shared/constants';
import { SPARTACUS_STOREFINDER } from '../../../../shared/libs-constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const STORE_FINDER_STORE_DESCRIPTION_COMPONENT_MIGRATION: ConstructorDeprecation =
  {
    // feature-libs/storefinder/components/store-finder-store-description/store-finder-store-description.component.ts
    class: STORE_FINDER_STORE_DESCRIPTION_COMPONENT,
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
