/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Price } from '@spartacus/core';

export interface OpfGiftCards {
  id: string;
  maskedNumber: string;
  balance: Price;
  appliedAmount: Price;
  remainingBalance: Price;
}
export interface OpfGiftCardSummary {
  totalBalance: Price;
  totalAppliedAmount: Price;
  totalRemainingBalance: Price;
  giftCardsCoverFullAmount: boolean;
}
export interface OpfGiftCardBalanceRequest {
  number: string;
  securityCode: string;
}

export type OpfGiftCardResponse = OpfGiftCards;
