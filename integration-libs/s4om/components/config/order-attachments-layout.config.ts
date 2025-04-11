/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DIALOG_TYPE, LayoutConfig } from '@spartacus/storefront';
import { AttachmentsDialogComponent } from '../order-detail-attachments/attachments-dialog/attachments-dialog.component';

export const defaultOrderAttachmentsLayoutConfig: LayoutConfig = {
  launch: {
    S4OM_ORDER_ATTACHMENTS: {
      inline: true,
      component: AttachmentsDialogComponent,
      dialogType: DIALOG_TYPE.DIALOG,
    },
  },
};
