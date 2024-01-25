/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DIALOG_TYPE, LayoutConfig } from '@spartacus/storefront';
import { MyAccountV2DownloadInvoicesComponent } from './my-account-v2-download-invoices.component';

export const defaultMyAccountV2DownloadInvoicesLayoutConfig: LayoutConfig = {
  launch: {
    DOWNLOAD_ORDER_INVOICES: {
      inlineRoot: true,
      component: MyAccountV2DownloadInvoicesComponent,
      dialogType: DIALOG_TYPE.DIALOG,
    },
  },
};
