/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ACTIVE_CART_SERVICE,
  CART_PAGE_LAYOUT_HANDLER,
  CART_SERVICE,
  FEATURE_CONFIG_SERVICE,
  SELECTIVE_CART_SERVICE,
} from '../../../../shared/constants';
import {
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
} from '../../../../shared/libs-constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const CART_PAGE_LAYOUT_HANDLER_MIGRATIONS: ConstructorDeprecation[] = [
  // projects/storefrontlib/cms-components/cart/cart-page-layout-handler.ts
  {
    class: CART_PAGE_LAYOUT_HANDLER,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
      {
        className: CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
    removeParams: [
      {
        className: CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
    addParams: [
      {
        className: ACTIVE_CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: SELECTIVE_CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
  },
  {
    class: CART_PAGE_LAYOUT_HANDLER,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
      {
        className: CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: SELECTIVE_CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: FEATURE_CONFIG_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
    removeParams: [
      {
        className: CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: SELECTIVE_CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: FEATURE_CONFIG_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
    addParams: [
      {
        className: ACTIVE_CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: SELECTIVE_CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
  },
];
