/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ANGULAR_CORE,
  ANONYMOUS_CONSENT_LAUNCH_DIALOG_SERVICE,
  ANONYMOUS_CONSENT_OPEN_DIALOG_COMPONENT,
  LAUNCH_DIALOG_SERVICE,
  VIEW_CONTAINER_REF,
} from '../../../../shared/constants';
import { SPARTACUS_STOREFRONTLIB } from '../../../../shared/libs-constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const ANONYMOUS_CONSENT_OPEN_DIALOG_COMPONENT_MIGRATION_V1: ConstructorDeprecation =
  {
    // storefrontlib/cms-components/anonymous-consent-management/open-dialog/anonymous-consent-open-dialog.component.ts
    class: ANONYMOUS_CONSENT_OPEN_DIALOG_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
      {
        className: VIEW_CONTAINER_REF,
        importPath: ANGULAR_CORE,
      },
      {
        className: ANONYMOUS_CONSENT_LAUNCH_DIALOG_SERVICE,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
    ],
    removeParams: [
      {
        className: ANONYMOUS_CONSENT_LAUNCH_DIALOG_SERVICE,
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

export const ANONYMOUS_CONSENT_OPEN_DIALOG_COMPONENT_MIGRATION_V2: ConstructorDeprecation =
  {
    // storefrontlib/cms-components/anonymous-consent-management/open-dialog/anonymous-consent-open-dialog.component.ts
    class: ANONYMOUS_CONSENT_OPEN_DIALOG_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
      {
        className: VIEW_CONTAINER_REF,
        importPath: ANGULAR_CORE,
      },
      {
        className: ANONYMOUS_CONSENT_LAUNCH_DIALOG_SERVICE,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
      {
        className: LAUNCH_DIALOG_SERVICE,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
    ],
    removeParams: [
      {
        className: ANONYMOUS_CONSENT_LAUNCH_DIALOG_SERVICE,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
    ],
  };
