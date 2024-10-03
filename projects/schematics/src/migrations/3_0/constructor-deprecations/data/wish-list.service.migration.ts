/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  AUTH_SERVICE,
  MULTI_CART_SERVICE,
  NGRX_STORE,
  STORE,
  USER_ID_SERVICE,
  USER_SERVICE,
  WISH_LIST_SERVICE,
} from '../../../../shared/constants';
import { SPARTACUS_CORE } from '../../../../shared/libs-constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const WISH_LIST_SERVICE_MIGRATION: ConstructorDeprecation = {
  // projects/core/src/cart/facade/wish-list.service.ts
  class: WISH_LIST_SERVICE,
  importPath: SPARTACUS_CORE,
  deprecatedParams: [
    {
      className: STORE,
      importPath: NGRX_STORE,
    },
    {
      className: AUTH_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: USER_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: MULTI_CART_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
  removeParams: [
    {
      className: AUTH_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
  addParams: [
    {
      className: USER_ID_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
};
