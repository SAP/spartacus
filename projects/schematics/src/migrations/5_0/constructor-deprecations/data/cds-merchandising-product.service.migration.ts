/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CDS_MERCHANDISING_PRODUCT_SERVICE,
  MERCHANDISING_STRATEGY_CONNECTOR,
  CDS_MERCHANDISING_USER_CONTEXT_SERVICE,
  CDS_MERCHANDISING_SITE_CONTEXT_SERVICE,
  CDS_MERCHANDISING_SEARCH_CONTEXT_SERVICE,
} from '../../../../shared/constants';
import { SPARTACUS_CDS } from '../../../../shared/libs-constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const CDS_MERCHANDISING_PRODUCT_SERVICE_CONSTRUCTOR_MIGRATION: ConstructorDeprecation =
  {
    //integration-libs/cds/src/merchandising/facade/cds-merchandising-product.service.ts
    class: CDS_MERCHANDISING_PRODUCT_SERVICE,
    importPath: SPARTACUS_CDS,
    deprecatedParams: [
      {
        className: MERCHANDISING_STRATEGY_CONNECTOR,
        importPath: SPARTACUS_CDS,
      },
      {
        className: CDS_MERCHANDISING_USER_CONTEXT_SERVICE,
        importPath: SPARTACUS_CDS,
      },
      {
        className: CDS_MERCHANDISING_SITE_CONTEXT_SERVICE,
        importPath: SPARTACUS_CDS,
      },
      {
        className: CDS_MERCHANDISING_SEARCH_CONTEXT_SERVICE,
        importPath: SPARTACUS_CDS,
      },
    ],
    removeParams: [
      {
        className: CDS_MERCHANDISING_SEARCH_CONTEXT_SERVICE,
        importPath: SPARTACUS_CDS,
      },
    ],
  };
