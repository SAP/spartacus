/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  GET,
  GET_PRODUCT_REFERENCES,
  LOAD_PRODUCT_REFERENCES,
  PRODUCT_REFERENCE_SERVICE,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { SPARTACUS_CORE } from '../../../../shared/libs-constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

// projects/core/src/product/facade/product-reference.service.ts
export const PRODUCT_REFERENCE_SERVICE_MIGRATION: MethodPropertyDeprecation[] =
  [
    {
      class: PRODUCT_REFERENCE_SERVICE,
      importPath: SPARTACUS_CORE,
      deprecatedNode: GET,
      comment: `// ${TODO_SPARTACUS} Method '${GET}' was removed from '${PRODUCT_REFERENCE_SERVICE}'. Use ${LOAD_PRODUCT_REFERENCES} and ${GET_PRODUCT_REFERENCES} instead.`,
    },
  ];
