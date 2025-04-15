/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DIALOG_TYPE, LayoutConfig } from '@spartacus/storefront';
import { S4omAttachmentsDialogComponent } from './order-attachments/attachments-dialog/s4om-attachments-dialog.component';

export const defaultS4omLayoutConfig: LayoutConfig = {
  launch: {
    S4OM_ORDER_ATTACHMENTS: {
      inline: true,
      component: S4omAttachmentsDialogComponent,
      dialogType: DIALOG_TYPE.DIALOG,
    },
  },
};
