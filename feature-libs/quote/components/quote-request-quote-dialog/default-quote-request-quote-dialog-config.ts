/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DIALOG_TYPE, LayoutConfig } from '@spartacus/storefront';
import { QuoteRequestQuoteDialogComponent } from './quote-request-quote-dialog.component';
import { QuoteConfirmQuoteRequestDialogComponent } from './confirm-request-quote-dialog/quote-confirm-quote-request-dialog.component';

export const defaultQuoteRequestQuoteDialogConfig: LayoutConfig = {
  launch: {
    REQUEST_QUOTE: {
      inline: true,
      component: QuoteRequestQuoteDialogComponent,
      dialogType: DIALOG_TYPE.DIALOG,
    },
    REQUEST_CONFIRMATION: {
      inline: true,
      component: QuoteConfirmQuoteRequestDialogComponent,
      dialogType: DIALOG_TYPE.DIALOG,
    },
  },
};
