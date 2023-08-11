/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ConfirmActionDialogMappingConfig,
  QuoteUIConfig,
} from './quote-ui.config';

/**
 * default confirm action dialog configuration
 */
const defaultConfirmActionDialogConfig = {
  showWarningNote: false,
  showExpirationDate: false,
  showSuccessMessage: true,
};

const defaultDialogMappings: ConfirmActionDialogMappingConfig = {
  BUYER_OFFER: {
    EDIT: {
      i18nKey: 'quote.confirmActionDialog.buyer_offer.edit',
      showWarningNote: true,
      showExpirationDate: true,
      showSuccessMessage: false,
    },
    CANCEL: {
      i18nKey: 'quote.confirmActionDialog.buyer_offer.cancel',
      ...defaultConfirmActionDialogConfig,
    },
  },
  BUYER: {
    SUBMIT: {
      i18nKey: 'quote.confirmActionDialog.buyer.submit',
      ...defaultConfirmActionDialogConfig,
    },
    CANCEL: {
      i18nKey: 'quote.confirmActionDialog.buyer.cancel',
      ...defaultConfirmActionDialogConfig,
    },
  },
  SELLER: {
    SUBMIT: {
      i18nKey: 'quote.confirmActionDialog.seller.submit',
      ...defaultConfirmActionDialogConfig,
    },
  },
  SELLERAPPROVER: {
    SUBMIT: {
      i18nKey: 'quote.confirmActionDialog.sellerapprover.submit',
      ...defaultConfirmActionDialogConfig,
    },
    REJECT: {
      i18nKey: 'quote.confirmActionDialog.sellerapprover.reject',
      ...defaultConfirmActionDialogConfig,
    },
  },
};

export const defaultQuoteUIConfig: QuoteUIConfig = {
  quote: {
    maxCharsForComments: 1000,
    confirmActionDialogMapping: defaultDialogMappings,
  },
};
