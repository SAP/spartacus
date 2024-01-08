/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ANGULAR_CORE,
  CONSIGNMENT_TRACKING_COMPONENT,
  LAUNCH_DIALOG_SERVICE,
  MODAL_SERVICE,
  ORDER_HISTORY_FACADE,
  VIEW_CONTAINER_REF,
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
