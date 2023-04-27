/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DIALOG_TYPE, LayoutConfig } from '@spartacus/storefront';
import { CommerceQuotesRequestQuoteDialogComponent } from './commerce-quotes-request-quote-dialog.component';
import { ConfirmQuoteRequestDialogComponent } from './confirm-request-quote-dialog/confirm-quote-request-dialog.component';

export const defaultCommerceQuotesRequestQuoteDialogConfig: LayoutConfig = {
  launch: {
    REQUEST_QUOTE: {
      inline: true,
      component: CommerceQuotesRequestQuoteDialogComponent,
      dialogType: DIALOG_TYPE.DIALOG,
    },
    REQUEST_CONFIRMATION: {
      inline: true,
      component: ConfirmQuoteRequestDialogComponent,
      dialogType: DIALOG_TYPE.DIALOG,
    },
  },
};
