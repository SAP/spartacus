/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Cart } from '@spartacus/cart/base/root';
import { Product } from '@spartacus/core';
import { Observable } from 'rxjs';

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
  authResult: any;
  payment: any;
}

export interface ApplePayTransactionInput {
  product?: Product;
  cart?: Cart;
  quantity?: number;
  countryCode?: string;
}

/**
 * Configuration needed for starting an ApplePaySession
 */
export interface ApplePaySessionConfig {
  request: any;
  onValidateMerchant: (event: any) => Observable<any>;
  onShippingContactSelected: (event: any) => Observable<any>;
  onPaymentMethodSelected: (event: any) => Observable<any>;
  onShippingMethodSelected: (event: any) => Observable<any>;
  onPaymentAuthorized: (event: any) => Observable<any>;
}

export enum ApplePayEvent {
  VALIDATE_MERCHANT = 'validatemerchant',
  CANCEL = 'cancel',
  PAYMENT_METHOD_SELECTED = 'paymentmethodselected',
  SHIPPING_CONTACT_SELECTED = 'shippingcontactselected',
  SHIPPING_METHOD_SELECTED = 'shippingmethodselected',
  PAYMENT_AUTHORIZED = 'paymentauthorized',
}

export enum ApplePayShippingType {
  SHIPPING = 'shipping',
  DELIVERY = 'delivery',
  STORE_PICKUP = 'storePickup',
  SERVICE_PICKUP = 'servicePickup',
}
