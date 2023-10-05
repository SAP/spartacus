/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DIALOG_TYPE, LayoutConfig } from '@spartacus/storefront';
import { QuoteConfirmActionDialogComponent } from './quote-confirm-action-dialog.component';

export const defaultQuoteActionDialogConfig: LayoutConfig = {
  launch: {
    ACTION_CONFIRMATION: {
      inline: true,
      component: QuoteConfirmActionDialogComponent,
      dialogType: DIALOG_TYPE.DIALOG,
    },
  },
};
