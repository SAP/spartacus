/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CURRENT_USER_GROUP_SERVICE,
  MESSAGE_SERVICE,
  USER_GROUP_USER_LIST_COMPONENT,
  USER_GROUP_USER_LIST_SERVICE,
} from '../../../../shared/constants';
import { SPARTACUS_ORGANIZATION_ADMINISTRATION_COMPONENTS } from '../../../../shared/libs-constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const USER_GROUP_USER_LIST_COMPONENT_MIGRATION: ConstructorDeprecation =
  {
    // feature-libs\organization\administration\components\user-group\users\user-group-user-list.component.ts
    class: USER_GROUP_USER_LIST_COMPONENT,
    importPath: SPARTACUS_ORGANIZATION_ADMINISTRATION_COMPONENTS,
    deprecatedParams: [
      {
        className: CURRENT_USER_GROUP_SERVICE,
        importPath: SPARTACUS_ORGANIZATION_ADMINISTRATION_COMPONENTS,
      },
      {
        className: USER_GROUP_USER_LIST_SERVICE,
        importPath: SPARTACUS_ORGANIZATION_ADMINISTRATION_COMPONENTS,
      },
      {
        className: MESSAGE_SERVICE,
        importPath: SPARTACUS_ORGANIZATION_ADMINISTRATION_COMPONENTS,
      },
    ],
    removeParams: [
      {
        className: MESSAGE_SERVICE,
        importPath: SPARTACUS_ORGANIZATION_ADMINISTRATION_COMPONENTS,
      },
    ],
  };
