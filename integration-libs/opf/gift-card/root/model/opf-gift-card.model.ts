/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Price } from '@spartacus/core';

export interface GiftCard {
  id: string;
  maskedNumber: string;
  balance: Price;
  appliedAmount: Price;
  remainingBalance: Price;
}
export interface GiftCardSummary {
  totalBalance: Price;
  totalAppliedAmount: Price;
  totalRemainingBalance: Price;
  giftCardsCoverFullAmount: boolean;
}
// configuration id is number
export interface GiftCardBalanceRequest {
  configurationId: string | number;
  number: string;
  securityCode: string;
}

export type GiftCardResponse = GiftCard;

export enum OpfGiftCardProviderType {
  GIFT_CARD_PAYMENT = 'GIFT_CARD_PAYMENT',
}
