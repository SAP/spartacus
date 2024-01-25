/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  MODAL_SERVICE,
  CONSIGNMENT_TRACKING_COMPONENT,
  ORDER_HISTORY_FACADE,
  LAUNCH_DIALOG_SERVICE,
  VIEW_CONTAINER_REF,
  ANGULAR_CORE,
} from '../../../../shared/constants';
import {
  SPARTACUS_ORDER_COMPONENTS,
  SPARTACUS_ORDER_ROOT,
  SPARTACUS_STOREFRONTLIB,
} from '../../../../shared/libs-constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const CONSIGNMENT_TRACKING_COMPONENT_CONSTRUCTOR_MIGRATION: ConstructorDeprecation =
  {
    // feature-libs/order/components/order-details/order-detail-items/consignment-tracking/consignment-tracking.component.ts
    class: CONSIGNMENT_TRACKING_COMPONENT,
    importPath: SPARTACUS_ORDER_COMPONENTS,
    deprecatedParams: [
      {
        className: ORDER_HISTORY_FACADE,
        importPath: SPARTACUS_ORDER_ROOT,
      },
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
