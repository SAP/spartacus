/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ELEMENT_REF,
  ANGULAR_CORE,
  LAUNCH_DIALOG_SERVICE,
  NGB_ACTIVE_MODAL,
  NG_BOOTSTRAP,
  ORDER_HISTORY_FACADE,
  TRACKING_EVENTS_COMPONENT,
} from '../../../../shared/constants';
import {
  SPARTACUS_ORDER_COMPONENTS,
  SPARTACUS_ORDER_ROOT,
  SPARTACUS_STOREFRONTLIB,
} from '../../../../shared/libs-constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const TRACKING_EVENTS_COMPONENT_CONSTRUCTOR_MIGRATION: ConstructorDeprecation =
  {
    // feature-libs/order/components/order-details/order-detail-items/consignment-tracking/tracking-events/tracking-events.component.ts
    class: TRACKING_EVENTS_COMPONENT,
    importPath: SPARTACUS_ORDER_COMPONENTS,
    deprecatedParams: [
      {
        className: ORDER_HISTORY_FACADE,
        importPath: SPARTACUS_ORDER_ROOT,
      },
      {
        className: NGB_ACTIVE_MODAL,
        importPath: NG_BOOTSTRAP,
      },
    ],
    removeParams: [
      {
        className: NGB_ACTIVE_MODAL,
        importPath: NG_BOOTSTRAP,
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
