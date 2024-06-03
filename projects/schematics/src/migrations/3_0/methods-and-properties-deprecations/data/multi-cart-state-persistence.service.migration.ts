/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  INIT_SYNC,
  MULTI_CART_STATE_PERSISTENCE_SERVICE,
  SYNC,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { SPARTACUS_CORE } from '../../../../shared/libs-constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

// projects/core/src/cart/services/multi-cart-state-persistence.service.ts
export const MULTI_CART_STATE_PERSISTENCE_SERVICE_MIGRATION: MethodPropertyDeprecation[] =
  [
    {
      class: MULTI_CART_STATE_PERSISTENCE_SERVICE,
      importPath: SPARTACUS_CORE,
      deprecatedNode: SYNC,
      comment: `// ${TODO_SPARTACUS} Method '${SYNC}' was renamed to ${INIT_SYNC}.`,
    },
  ];
