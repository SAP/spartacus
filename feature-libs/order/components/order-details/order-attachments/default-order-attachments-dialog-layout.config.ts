/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DIALOG_TYPE, LayoutConfig } from '@spartacus/storefront';
import { OrderAttachmentsDialogComponent } from './attachments-dialog/order-attachments-dialog.component';

export const defaultOrderAttachmentsDialogLayoutConfig: LayoutConfig = {
  launch: {
    ORDER_ATTACHMENTS: {
      inline: true,
      component: OrderAttachmentsDialogComponent,
      dialogType: DIALOG_TYPE.DIALOG,
    },
  },
};
