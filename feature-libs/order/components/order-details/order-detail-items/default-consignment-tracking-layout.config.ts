/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { LayoutConfig, DIALOG_TYPE } from '@spartacus/storefront';
import { TrackingEventsComponent } from './consignment-tracking/tracking-events/tracking-events.component';

export const defaultConsignmentTrackingLayoutConfig: LayoutConfig = {
  launch: {
    CONSIGNMENT_TRACKING: {
      inlineRoot: true,
      component: TrackingEventsComponent,
      dialogType: DIALOG_TYPE.DIALOG,
    },
  },
};
