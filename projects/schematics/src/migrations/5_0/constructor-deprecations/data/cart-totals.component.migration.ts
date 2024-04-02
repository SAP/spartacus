/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ACTIVE_CART_SERVICE,
  ANGULAR_ROUTER,
  CART_TOTALS_COMPONENT,
  ROUTER,
} from '../../../../shared/constants';
import {
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
} from '../../../../shared/libs-constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const CART_TOTALS_COMPONENT_MIGRATION: ConstructorDeprecation = {
  // feature-libs/cart/base/components/cart-totals/cart-totals.component.ts
  class: CART_TOTALS_COMPONENT,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
    {
      className: ACTIVE_CART_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: ROUTER,
      importPath: ANGULAR_ROUTER,
    },
  ],
  removeParams: [
    {
      className: ROUTER,
      importPath: ANGULAR_ROUTER,
    },
  ],
};
