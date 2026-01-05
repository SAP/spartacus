/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Cart } from '@spartacus/cart/base/root';
import { PointOfService, Product } from '@spartacus/core';

export interface OpfQuickBuyDigitalWallet {
  description?: string;
  provider?: OpfQuickBuyProviderType;
  enabled?: boolean;
  merchantId?: string;
  merchantName?: string;
  countryCode?: string;
  googlePayGateway?: string;
}

export interface OpfQuickBuyDeliveryInfo {
  type: OpfQuickBuyDeliveryType;
  pickupDetails?: PointOfService;
}

export interface QuickBuyTransactionDetails {
  context?: OpfQuickBuyLocation;
  cart?: Cart;
  product?: Product;
  quantity?: number;
  deliveryInfo?: OpfQuickBuyDeliveryInfo;
  addressIds: string[];
  total: {
    amount: string;
    label: string;
    currency: string;
  };
}

export enum OpfQuickBuyLocation {
  CART = 'CART',
  PRODUCT = 'PRODUCT',
}

export enum OpfQuickBuyDeliveryType {
  SHIPPING = 'SHIPPING',
  PICKUP = 'PICKUP',
}

export enum OpfQuickBuyProviderType {
  APPLE_PAY = 'APPLE_PAY',
  GOOGLE_PAY = 'GOOGLE_PAY',
}

export const OPF_GOOGLE_PAY_PROVIDER_NAME = 'googlePay';

export interface OpfQuickBuyGooglePayProvider {
  resourceUrl?: string;
}
