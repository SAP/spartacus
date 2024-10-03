/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ANGULAR_CORE,
  CLOSE_ACCOUNT_COMPONENT,
  LAUNCH_DIALOG_SERVICE,
  MODAL_SERVICE,
  VIEW_CONTAINER_REF,
} from '../../../../shared/constants';
import {
  SPARTACUS_STOREFRONTLIB,
  SPARTACUS_USER_PROFILE_COMPONENTS,
} from '../../../../shared/libs-constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const CLOSE_ACCOUNT_COMPONENT_CONSTRUCTOR_MIGRATION: ConstructorDeprecation =
  {
    // feature-libs/user/profile/components/close-account/components/close-account/close-account.component.ts
    class: CLOSE_ACCOUNT_COMPONENT,
    importPath: SPARTACUS_USER_PROFILE_COMPONENTS,
    deprecatedParams: [
      {
        className: MODAL_SERVICE,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
    ],
    removeParams: [
      {
        className: MODAL_SERVICE,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
    ],
    addParams: [
      {
        className: LAUNCH_DIALOG_SERVICE,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
      {
        className: VIEW_CONTAINER_REF,
        importPath: ANGULAR_CORE,
      },
    ],
  };
