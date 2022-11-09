/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CDS_MERCHANDISING_PRODUCT_SERVICE,
  LOAD_PRODUCT_FOR_STRATEGY_METHOD,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { SPARTACUS_CDS } from '../../../../shared/libs-constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

// integration-libs/cds/src/merchandising/facade/cds-merchandising-product.service.ts
export const CDS_MERCHANDISING_PRODUCT_SERVICE_MIGRATION: MethodPropertyDeprecation[] =
  [
    {
      class: CDS_MERCHANDISING_PRODUCT_SERVICE,
      importPath: SPARTACUS_CDS,
      deprecatedNode: LOAD_PRODUCT_FOR_STRATEGY_METHOD,
      comment: `// ${TODO_SPARTACUS} Method '${CDS_MERCHANDISING_PRODUCT_SERVICE}.${LOAD_PRODUCT_FOR_STRATEGY_METHOD}' was changed. New return type is Observable<StrategyResponse>. StrategyProducts which was returned before can be read from StrategyResponse.products field`,
    },
  ];
