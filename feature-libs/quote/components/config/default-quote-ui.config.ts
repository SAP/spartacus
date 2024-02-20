/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
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
  showOnlyWhenCartIsNotEmpty: false,
};

const defaultDialogMappings: ConfirmActionDialogMappingConfig = {
  BUYER_OFFER: {
    EDIT: {
      i18nKeyPrefix: 'quote.confirmDialog.buyer_offer.edit',
      showWarningNote: true,
      showExpirationDate: true,
      showSuccessMessage: false,
      showOnlyWhenCartIsNotEmpty: false,
    },
    CANCEL: {
      i18nKeyPrefix: 'quote.confirmDialog.buyer_offer.cancel',
      ...defaultConfirmActionDialogConfig,
    },
    CHECKOUT: {
      i18nKeyPrefix: 'quote.confirmDialog.buyer_offer.checkout',
      ...defaultConfirmActionDialogConfig,
      showSuccessMessage: false,
    },
  },
  EXPIRED: {
    EDIT: {
      i18nKeyPrefix: 'quote.confirmDialog.expired.edit',
      showWarningNote: true,
      showExpirationDate: false,
      showSuccessMessage: false,
      showOnlyWhenCartIsNotEmpty: false,
    },
    REQUOTE: {
      i18nKeyPrefix: 'quote.confirmDialog.expired.requote',
      showWarningNote: true,
      showExpirationDate: false,
      showSuccessMessage: false,
      showOnlyWhenCartIsNotEmpty: false,
    },
  },
  BUYER: {
    SUBMIT: {
      i18nKeyPrefix: 'quote.confirmDialog.buyer.submit',
      ...defaultConfirmActionDialogConfig,
    },
    CANCEL: {
      i18nKeyPrefix: 'quote.confirmDialog.buyer.cancel',
      ...defaultConfirmActionDialogConfig,
    },
  },
  SELLER: {
    SUBMIT: {
      i18nKeyPrefix: 'quote.confirmDialog.seller.submit',
      ...defaultConfirmActionDialogConfig,
      showWarningNote: true,
    },
  },
  SELLERAPPROVER: {
    APPROVE: {
      i18nKeyPrefix: 'quote.confirmDialog.sellerapprover.approve',
      ...defaultConfirmActionDialogConfig,
    },
    REJECT: {
      i18nKeyPrefix: 'quote.confirmDialog.sellerapprover.reject',
      ...defaultConfirmActionDialogConfig,
    },
  },
  CANCELLED: {
    REQUOTE: {
      i18nKeyPrefix: 'quote.confirmDialog.cancelled.requote',
      showWarningNote: true,
      showExpirationDate: false,
      showSuccessMessage: false,
      showOnlyWhenCartIsNotEmpty: true,
    },
  },
  ALL: {
    EDIT: {
      i18nKeyPrefix: 'quote.confirmDialog.all.edit',
      showWarningNote: true,
      showExpirationDate: false,
      showSuccessMessage: false,
      showOnlyWhenCartIsNotEmpty: true,
    },
  },
};

export const defaultQuoteUIConfig: QuoteUIConfig = {
  quote: {
    maxCharsForComments: 1000,
    truncateCardTileContentAfterNumChars: 100,
    updateDebounceTime: {
      expiryDate: 500,
    },
    confirmActionDialogMapping: defaultDialogMappings,
    maximumDecimalsForPercentageDiscount: 8,
  },
};
