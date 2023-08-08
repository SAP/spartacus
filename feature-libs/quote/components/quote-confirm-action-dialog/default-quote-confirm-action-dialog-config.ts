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

export type ConfirmActionDialogConfig = {
  i18nKey: string;
  showWarningNote: boolean;
  showExpirationDate: boolean;
  navigateToQuoteList: boolean;
};

/**
 * default confirm action dialog configuration
 */
export const defaultConfirmActionDialogConfig = {
  showWarningNote: false,
  showExpirationDate: false,
  navigateToQuoteList: true,
};

/**
 * confirm action dialog configuration - if  not provided for a given state/action combination dialog will be skipped
 */
export const confirmActionDialogConfigs: Map<
  string,
  Partial<ConfirmActionDialogConfig>
> = new Map([
  ['buyer.submit', {}],
  [
    'buyer_offer.edit',
    {
      showWarningNote: true,
      showExpirationDate: true,
      navigateToQuoteList: false,
    },
  ],
  ['buyer_offer.cancel', {}],
  ['buyer.cancel', {}],
  ['seller.submit', {}],
  ['sellerapprover.submit', {}],
  ['sellerapprover.reject', {}],
]);
