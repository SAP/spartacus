/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Price } from '@spartacus/core';

export interface SAPGiftCard {
  id: string;
  maskedNumber: string;
  balance: Price;
  appliedAmount: Price;
  remainingBalance: Price;
}
export interface SAPGiftCardSummary {
  totalBalance: Price;
  totalAppliedAmount: Price;
  totalRemainingBalance: Price;
  giftCardsCoverFullAmount: boolean;
}
export interface SAPGiftCardBalanceRequest {
  number: string;
  securityCode: string;
}

export type SAPGiftCardResponse = SAPGiftCard;
