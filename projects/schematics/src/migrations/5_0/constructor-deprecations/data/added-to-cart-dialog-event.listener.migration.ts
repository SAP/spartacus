/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ADDED_TO_CART_DIALOG_EVENT_LISTENER,
  EVENT_SERVICE,
  LAUNCH_DIALOG_SERVICE,
  MODAL_SERVICE,
} from '../../../../shared/constants';
import {
  SPARTACUS_CART_BASE_COMPONENTS,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
} from '../../../../shared/libs-constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const ADDED_TO_CART_DIALOG_EVENT_LISTENER_CONSTRUCTOR_MIGRATION: ConstructorDeprecation =
  {
    // feature-libs/cart/base/components/added-to-cart-dialog/added-to-cart-dialog-event.listener.ts
    class: ADDED_TO_CART_DIALOG_EVENT_LISTENER,
    importPath: SPARTACUS_CART_BASE_COMPONENTS,
    deprecatedParams: [
      { className: EVENT_SERVICE, importPath: SPARTACUS_CORE },
      { className: MODAL_SERVICE, importPath: SPARTACUS_STOREFRONTLIB },
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
