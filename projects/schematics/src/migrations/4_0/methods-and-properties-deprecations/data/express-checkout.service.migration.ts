/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CLEAR_CHECKOUT_FACADE,
  EXPRESS_CHECKOUT_SERVICE,
  RESET_CHECKOUT_PROCESSES,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { SPARTACUS_CHECKOUT_OLD_COMPONENTS } from '../../../../shared/libs-constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

export const EXPRESS_CHECKOUT_SERVICE_MIGRATION: MethodPropertyDeprecation[] = [
  // feature-libs/checkout/components/services/express-checkout.service.ts
  {
    class: EXPRESS_CHECKOUT_SERVICE,
    importPath: SPARTACUS_CHECKOUT_OLD_COMPONENTS,
    deprecatedNode: RESET_CHECKOUT_PROCESSES,
    comment: `// ${TODO_SPARTACUS} Method '${EXPRESS_CHECKOUT_SERVICE}.${RESET_CHECKOUT_PROCESSES}' was removed, use method '${RESET_CHECKOUT_PROCESSES}' from '${CLEAR_CHECKOUT_FACADE}' instead`,
  },
];
