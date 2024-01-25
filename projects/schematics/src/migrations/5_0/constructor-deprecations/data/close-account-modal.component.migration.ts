/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ANGULAR_CORE,
  AUTH_SERVICE,
  CLOSE_ACCOUNT_MODAL_COMPONENT,
  ELEMENT_REF,
  GLOBAL_MESSAGE_SERVICE,
  LAUNCH_DIALOG_SERVICE,
  MODAL_SERVICE,
  ROUTING_SERVICE,
  TRANSLATION_SERVICE,
  USER_PROFILE_FACADE,
} from '../../../../shared/constants';
import {
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
  SPARTACUS_USER_PROFILE_COMPONENTS,
  SPARTACUS_USER_PROFILE_ROOT,
} from '../../../../shared/libs-constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const CLOSE_ACCOUNT_MODAL_COMPONENT_CONSTRUCTOR_MIGRATION: ConstructorDeprecation =
  {
    // feature-libs/user/profile/components/close-account/components/close-account-modal/close-account-modal.component.ts
    class: CLOSE_ACCOUNT_MODAL_COMPONENT,
    importPath: SPARTACUS_USER_PROFILE_COMPONENTS,
    deprecatedParams: [
      {
        className: MODAL_SERVICE,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
      {
        className: AUTH_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: GLOBAL_MESSAGE_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: ROUTING_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: TRANSLATION_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: USER_PROFILE_FACADE,
        importPath: SPARTACUS_USER_PROFILE_ROOT,
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
        className: ELEMENT_REF,
        importPath: ANGULAR_CORE,
      },
    ],
  };
