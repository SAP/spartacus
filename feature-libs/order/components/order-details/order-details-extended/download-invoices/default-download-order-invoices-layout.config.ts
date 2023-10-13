/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DIALOG_TYPE, LayoutConfig } from '@spartacus/storefront';
import { DownloadOrderInvoicesDialogComponent } from './download-order-invoices-dialog.component';

export const defaultDownloadOrderInvoicesLayoutConfig: LayoutConfig = {
  launch: {
    DOWNLOAD_ORDER_INVOICES: {
      inlineRoot: true,
      component: DownloadOrderInvoicesDialogComponent,
      dialogType: DIALOG_TYPE.DIALOG,
    },
  },
};
