/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ANGULAR_ROUTER,
  AUTH_REDIRECT_SERVICE,
  AUTH_SERVICE,
  NOT_AUTH_GUARD,
  ROUTER,
  SEMANTIC_PATH_SERVICE,
} from '../../../../shared/constants';
import { SPARTACUS_CORE } from '../../../../shared/libs-constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const NOT_AUTH_GUARD_MIGRATION: ConstructorDeprecation = {
  // projects/core/src/auth/user-auth/guards/not-auth.guard.ts
  class: NOT_AUTH_GUARD,
  importPath: SPARTACUS_CORE,
  deprecatedParams: [
    {
      className: AUTH_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: AUTH_REDIRECT_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: SEMANTIC_PATH_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: ROUTER,
      importPath: ANGULAR_ROUTER,
    },
  ],
  removeParams: [
    {
      className: AUTH_REDIRECT_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
};
