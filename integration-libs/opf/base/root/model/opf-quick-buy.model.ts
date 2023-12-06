/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product } from '@spartacus/core';
import { Observable } from 'rxjs';
import { OpfDynamicScript } from './opf.model';

export interface DigitalWalletQuickBuy {
  description?: string;
  provider?: OpfProviderType;
  enabled?: boolean;
  merchantId?: string;
  merchantName?: string;
  googlePayGateway?: string;
}

export enum OpfProviderType {
  APPLE_PAY = 'APPLE_PAY',
  GOOGLE_PAY = 'GOOGLE_PAY',
}

export type CtaAdditionalDataKey =
  | 'divisionId'
  | 'experienceId'
  | 'currency'
  | 'fulfillmentLocationId'
  | 'locale'
  | 'scriptIdentifier';
export interface CtaScriptsRequest {
  paymentAccountIds?: Array<number>;
  orderId?: string;
  ctaProductItems?: Array<CTAProductItem>;
  scriptLocations?: Array<CtaScriptsLocation>;
  additionalData?: Array<{
    key: CtaAdditionalDataKey;
    value: string;
  }>;
}

export interface CTAProductItem {
  productId: string;
  quantity: number;
  fulfillmentLocationId?: string;
}

export enum CtaScriptsLocation {
  CART_MESSAGING = 'CART_MESSAGING',
  PDP_MESSAGING = 'PDP_MESSAGING',
  PDP_QUICK_BUY = 'PDP_QUICK_BUY',
  CART_QUICK_BUY = 'CART_QUICK_BUY',
  CHECKOUT_QUICK_BUY = 'CHECKOUT_QUICK_BUY',
  ORDER_CONFIRMATION_PAYMENT_GUIDE = 'ORDER_CONFIRMATION_PAYMENT_GUIDE',
  ORDER_HISTORY_PAYMENT_GUIDE = 'ORDER_HISTORY_PAYMENT_GUIDE',
}

export enum CmsPageLocation {
  ORDER_CONFIRMATION_PAGE = 'orderConfirmationPage',
  ORDER_PAGE = 'order',
  PDP_PAGE = 'productDetails',
  CART_PAGE = 'cartPage',
}

export interface CtaScriptsResponse {
  value: Array<CtaScript>;
}

export interface CtaScript {
  paymentAccountId: number;
  dynamicScript: OpfDynamicScript;
}

export interface LocalCart {
  isPdp?: boolean;
  cartId?: string;
  product?: Product;
  quantity?: number;
  pickup?: boolean;
  addressIds: string[];
  total: {
    amount: string;
    label: string;
  };
}

export interface ApplePaySessionVerificationRequest {
  cartId: string;
  validationUrl: string;
  initiative: 'web';
  initiativeContext: string;
}

export interface ApplePaySessionVerificationResponse {
  epochTimestamp: number;
  expiresAt: number;
  merchantSessionIdentifier: string;
  nonce: string;
  merchantIdentifier: string;
  domainName: string;
  displayName: string;
  signature: string;
}

export interface ApplePayAuthorizationResult {
  authResult: ApplePayJS.ApplePayPaymentAuthorizationResult;
  payment: ApplePayJS.ApplePayPayment;
}

export interface ApplePayObservableConfig {
  request: ApplePayJS.ApplePayPaymentRequest;
  validateMerchant: (
    event: ApplePayJS.ApplePayValidateMerchantEvent
  ) => Observable<any>;
  shippingContactSelected: (
    event: ApplePayJS.ApplePayShippingContactSelectedEvent
  ) => Observable<ApplePayJS.ApplePayShippingContactUpdate>;
  paymentMethodSelected: (
    event: ApplePayJS.ApplePayPaymentMethodSelectedEvent
  ) => Observable<ApplePayJS.ApplePayPaymentMethodUpdate>;
  shippingMethodSelected: (
    event: ApplePayJS.ApplePayShippingMethodSelectedEvent
  ) => Observable<ApplePayJS.ApplePayShippingMethodUpdate>;
  paymentAuthorized: (
    event: ApplePayJS.ApplePayPaymentAuthorizedEvent
  ) => Observable<ApplePayJS.ApplePayPaymentAuthorizationResult>;
}
