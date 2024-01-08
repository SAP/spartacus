/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { LayoutConfig } from '../../../../layout/config/layout-config';
import { DIALOG_TYPE } from '../../../../layout/launch-dialog/config/launch-config';
import { StockNotificationDialogComponent } from './stock-notification-dialog.component';

export const defaultStockNotificationLayoutConfig: LayoutConfig = {
  launch: {
    STOCK_NOTIFICATION: {
      inlineRoot: true,
      component: StockNotificationDialogComponent,
      dialogType: DIALOG_TYPE.DIALOG,
    },
  },
};
