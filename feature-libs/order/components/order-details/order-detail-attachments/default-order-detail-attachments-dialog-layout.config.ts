/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DIALOG_TYPE, LayoutConfig } from '@spartacus/storefront';
import { OrderDetailAttachmentsDialogComponent } from './attachments-dialog/order-detail-attachments-dialog.component';

export const defaultOrderDetailAttachmentsDialogLayoutConfig: LayoutConfig = {
  launch: {
    ORDER_ATTACHMENTS: {
      inline: true,
      component: OrderDetailAttachmentsDialogComponent,
      dialogType: DIALOG_TYPE.DIALOG,
    },
  },
};
