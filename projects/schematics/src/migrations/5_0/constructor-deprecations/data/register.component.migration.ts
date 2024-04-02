/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  REGISTER_COMPONENT,
  REGISTER_COMPONENT_SERVICE,
  USER_REGISTER_FACADE,
} from '../../../../shared/constants';
import {
  SPARTACUS_USER_PROFILE_COMPONENTS,
  SPARTACUS_USER_PROFILE_ROOT,
} from '../../../../shared/libs-constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const REGISTER_COMPONENT_CONSTRUCTOR_MIGRATION: ConstructorDeprecation =
  {
    // feature-libs/user/profile/components/register/register.component.ts
    class: REGISTER_COMPONENT,
    importPath: SPARTACUS_USER_PROFILE_COMPONENTS,
    removeParams: [
      {
        className: USER_REGISTER_FACADE,
        importPath: SPARTACUS_USER_PROFILE_ROOT,
      },
    ],
    addParams: [
      {
        className: REGISTER_COMPONENT_SERVICE,
        importPath: SPARTACUS_USER_PROFILE_COMPONENTS,
      },
    ],
    deprecatedParams: [],
  };
