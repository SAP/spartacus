/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { QuoteActionType } from '@spartacus/quote/root';
import { QuoteCoreConfig } from './quote-core.config';

export const defaultQuoteCoreConfig: QuoteCoreConfig = {
  quote: {
    actions: {
      primaryActions: [
        QuoteActionType.APPROVE,
        QuoteActionType.CHECKOUT,
        QuoteActionType.SUBMIT,
        QuoteActionType.REQUOTE,
      ],
      actionsOrderByState: {
        BUYER_DRAFT: [
          QuoteActionType.SUBMIT,
          QuoteActionType.EDIT,
          QuoteActionType.CANCEL,
        ],
        BUYER_OFFER: [
          QuoteActionType.CHECKOUT,
          QuoteActionType.EDIT,
          QuoteActionType.CANCEL,
        ],
        CANCELLED: [QuoteActionType.REQUOTE],
        EXPIRED: [QuoteActionType.REQUOTE, QuoteActionType.CANCEL],
        SELLER_REQUEST: [QuoteActionType.SUBMIT, QuoteActionType.EDIT],
        SELLER_DRAFT: [QuoteActionType.SUBMIT, QuoteActionType.EDIT],
      },
    },
  },
};
