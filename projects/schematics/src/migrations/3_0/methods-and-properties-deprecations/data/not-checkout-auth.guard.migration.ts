/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CAN_ACTIVATE,
  NOT_CHECKOUT_AUTH_GUARD,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { SPARTACUS_STOREFRONTLIB } from '../../../../shared/libs-constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

// projects/storefrontlib/cms-components/checkout/guards/not-checkout-auth.guard.ts
export const NOT_CHECKOUT_AUTH_GUARD_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: NOT_CHECKOUT_AUTH_GUARD,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedNode: CAN_ACTIVATE,
    newNode: CAN_ACTIVATE,
    comment: `// ${TODO_SPARTACUS} Method '${CAN_ACTIVATE}' return type has changed from 'Observable<boolean>' to 'Observable<boolean | UrlTree>'.`,
  },
];
