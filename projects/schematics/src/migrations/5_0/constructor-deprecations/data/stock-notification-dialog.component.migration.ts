/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ANGULAR_CORE,
  ELEMENT_REF,
  LAUNCH_DIALOG_SERVICE,
  MODAL_SERVICE,
  STOCK_NOTIFICATION_DIALOG_COMPONENT,
  USER_INTERESTS_SERVICE,
} from '../../../../shared/constants';
import {
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
} from '../../../../shared/libs-constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const STOCK_NOTIFICATION_DIALOG_COMPONENT_CONSTRUCTOR_MIGRATION: ConstructorDeprecation =
  {
    // projects/storefrontlib/cms-components/product/stock-notification/stock-notification-dialog/stock-notification-dialog.component.ts
    class: STOCK_NOTIFICATION_DIALOG_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
      {
        className: MODAL_SERVICE,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
      {
        className: USER_INTERESTS_SERVICE,
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
      {
        className: ELEMENT_REF,
        importPath: ANGULAR_CORE,
      },
    ],
  };
