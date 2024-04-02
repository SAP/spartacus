/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  AUTH_REDIRECT_SERVICE,
  AUTH_SERVICE,
  GLOBAL_MESSAGE_SERVICE,
  ROUTING_SERVICE,
  UPDATE_EMAIL_COMPONENT_SERVICE,
  USER_EMAIL_FACADE,
} from '../../../../shared/constants';
import {
  SPARTACUS_CORE,
  SPARTACUS_USER_PROFILE_COMPONENTS,
  SPARTACUS_USER_PROFILE_ROOT,
} from '../../../../shared/libs-constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const UPDATE_EMAIL_COMPONENT_SERVICE_MIGRATION: ConstructorDeprecation =
  {
    // feature-libs\user\profile\components\update-email\update-email-component.service.ts
    class: UPDATE_EMAIL_COMPONENT_SERVICE,
    importPath: SPARTACUS_USER_PROFILE_COMPONENTS,
    deprecatedParams: [
      {
        className: USER_EMAIL_FACADE,
        importPath: SPARTACUS_USER_PROFILE_ROOT,
      },
      {
        className: ROUTING_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: GLOBAL_MESSAGE_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: AUTH_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
    addParams: [
      {
        className: AUTH_REDIRECT_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
  };
