/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  OCC_CHECKOUT_ADAPTER,
  PLACE_ORDER,
  SPARTACUS_CORE,
  TODO_SPARTACUS,
} from '../../../../shared';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

export const OCC_CHECKOUT_ADAPTER_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: OCC_CHECKOUT_ADAPTER,
    importPath: SPARTACUS_CORE,
    deprecatedNode: PLACE_ORDER,
    comment: `//${TODO_SPARTACUS} please add the 'termsChecked' parameter to your parameters for method ${PLACE_ORDER}`,
  },
];
