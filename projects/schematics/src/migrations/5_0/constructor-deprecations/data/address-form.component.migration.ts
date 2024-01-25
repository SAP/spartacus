/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ADDRESS_FORM_COMPONENT,
  ANGULAR_FORMS,
  FORM_BUILDER,
  GLOBAL_MESSAGE_SERVICE,
  LAUNCH_DIALOG_SERVICE,
  MODAL_SERVICE,
  TRANSLATION_SERVICE,
  USER_ADDRESS_SERVICE,
  USER_SERVICE,
} from '../../../../shared/constants';
import {
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
} from '../../../../shared/libs-constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const ADDRESS_FORM_COMPONENT_CONSTRUCTOR_MIGRATION: ConstructorDeprecation =
  {
    // integration-libs/cds/src/merchandising/facade/cds-merchandising-user-context.service.ts
    class: ADDRESS_FORM_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
      {
        className: FORM_BUILDER,
        importPath: ANGULAR_FORMS,
      },
      {
        className: USER_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: USER_ADDRESS_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: GLOBAL_MESSAGE_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: MODAL_SERVICE,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
      {
        className: TRANSLATION_SERVICE,
        importPath: SPARTACUS_CORE,
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
    ],
  };
