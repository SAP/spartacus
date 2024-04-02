/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DIALOG_TYPE, LayoutConfig } from '@spartacus/storefront';
import { ReplenishmentOrderCancellationDialogComponent } from '../replenishment-order-cancellation-dialog/replenishment-order-cancellation-dialog.component';

export const defaultReplenishmentOrderCancellationLayoutConfig: LayoutConfig = {
  launch: {
    REPLENISHMENT_ORDER: {
      inline: true,
      component: ReplenishmentOrderCancellationDialogComponent,
      dialogType: DIALOG_TYPE.DIALOG,
    },
  },
};
