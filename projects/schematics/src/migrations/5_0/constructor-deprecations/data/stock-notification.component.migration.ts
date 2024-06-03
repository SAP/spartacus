/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ANGULAR_CORE,
  CURRENT_PRODUCT_SERVICE,
  GLOBAL_MESSAGE_SERVICE,
  LAUNCH_DIALOG_SERVICE,
  MODAL_SERVICE,
  STOCK_NOTIFICATION_COMPONENT,
  TRANSLATION_SERVICE,
  USER_ID_SERVICE,
  USER_INTERESTS_SERVICE,
  USER_NOTIFICATION_PREFERENCE_SERVICE,
  VIEW_CONTAINER_REF,
} from '../../../../shared/constants';
import {
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
} from '../../../../shared/libs-constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const STOCK_NOTIFICATION_COMPONENT_CONSTRUCTOR_MIGRATION: ConstructorDeprecation =
  {
    // projects/storefrontlib/cms-components/product/stock-notification/stock-notification.component.ts
    class: STOCK_NOTIFICATION_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
      {
        className: CURRENT_PRODUCT_SERVICE,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
      {
        className: GLOBAL_MESSAGE_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: TRANSLATION_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: USER_INTERESTS_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: MODAL_SERVICE,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
      {
        className: USER_NOTIFICATION_PREFERENCE_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: USER_ID_SERVICE,
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
        className: VIEW_CONTAINER_REF,
        importPath: ANGULAR_CORE,
      },
    ],
  };
