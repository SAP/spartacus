/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  AUTH_SERVICE,
  NGRX_STORE,
  STORE,
  USER_ID_SERVICE,
  USER_NOTIFICATION_PREFERENCE_SERVICE,
} from '../../../../shared/constants';
import { SPARTACUS_CORE } from '../../../../shared/libs-constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const USER_NOTIFICATION_PREFERENCE_SERVICE_MIGRATION: ConstructorDeprecation =
  {
    // projects/core/src/user/facade/user-notification-preference.service.ts
    class: USER_NOTIFICATION_PREFERENCE_SERVICE,
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
