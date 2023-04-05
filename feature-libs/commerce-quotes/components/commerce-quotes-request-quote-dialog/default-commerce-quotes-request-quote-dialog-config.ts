/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DIALOG_TYPE, LayoutConfig } from '@spartacus/storefront';
import { CommerceQuotesRequestQuoteDialogComponent } from './commerce-quotes-request-quote-dialog.component';

export const defaultCommerceQuotesRequestQuoteDialogConfig: LayoutConfig = {
  launch: {
    REQUEST_QUOTE: {
      inline: true,
      component: CommerceQuotesRequestQuoteDialogComponent,
      dialogType: DIALOG_TYPE.DIALOG,
    },
  },
};
