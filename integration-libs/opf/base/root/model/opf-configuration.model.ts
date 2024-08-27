/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ActiveConfiguration {
  description?: string;
  id?: number;
  merchantId?: string;
  providerType?: OpfPaymentProviderType;
  displayName?: string;
  acquirerCountryCode?: string;
  digitalWalletQuickBuy?: DigitalWalletQuickBuy[];
}

export interface DigitalWalletQuickBuy {
  description?: string;
  provider?: DigitalWalletQuickBuyProvider;
  enabled?: boolean;
  merchantId?: string;
  merchantName?: string;
  countryCode?: string;
  googlePayGateway?: string;
}

export enum DigitalWalletQuickBuyProvider {
  APPLE_PAY = 'APPLE_PAY',
  GOOGLE_PAY = 'GOOGLE_PAY',
}

export enum OpfPaymentProviderType {
  PAYMENT_GATEWAY = 'PAYMENT_GATEWAY',
  PAYMENT_METHOD = 'PAYMENT_METHOD',
}
