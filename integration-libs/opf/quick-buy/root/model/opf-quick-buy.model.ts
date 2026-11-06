/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/// <reference types="@types/googlepay" />
/// <reference types="@types/applepayjs" />

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

export interface OpfQuickBuySingleProductCartOptions {
  quantity: number;
  pickupStore?: string;
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

export type OpfGooglePayPaymentRequestConfig = Pick<
  google.payments.api.PaymentDataRequest,
  | 'apiVersion'
  | 'apiVersionMinor'
  | 'merchantInfo'
  | 'emailRequired'
  | 'shippingAddressRequired'
  | 'shippingOptionRequired'
  | 'shippingAddressParameters'
  | 'callbackIntents'
>;

export type OpfGooglePayCardParametersConfig = Pick<
  google.payments.api.CardParameters,
  | 'allowedAuthMethods'
  | 'allowedCardNetworks'
  | 'billingAddressRequired'
  | 'billingAddressParameters'
>;

export interface OpfQuickBuyGooglePayProvider {
  resourceUrl?: string;
  environment?: google.payments.api.Environment;
  paymentRequest?: OpfGooglePayPaymentRequestConfig;
  cardParameters?: OpfGooglePayCardParametersConfig;
}

export type OpfApplePayCardParametersConfig = Pick<
  ApplePayJS.ApplePayPaymentRequest,
  | 'merchantCapabilities'
  | 'supportedNetworks'
  | 'requiredShippingContactFields'
  | 'requiredBillingContactFields'
  | 'shippingMethods'
>;

export interface OpfQuickBuyApplePayProvider {
  resourceUrl: string;
  cardParameters: OpfApplePayCardParametersConfig;
}
