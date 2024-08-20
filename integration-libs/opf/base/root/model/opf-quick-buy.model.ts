/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/// <reference types="@types/applepayjs" />
import { Cart } from '@spartacus/cart/base/root';
import { PointOfService, Product } from '@spartacus/core';
import { Observable } from 'rxjs';
import { OpfDynamicScript } from './opf.model';

export interface DigitalWalletQuickBuy {
  description?: string;
  provider?: OpfProviderType;
  enabled?: boolean;
  merchantId?: string;
  merchantName?: string;
  countryCode?: string;
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
  cartId?: string;
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

export interface CartHandlerState {
  cartId: string;
  userId: string;
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
  authResult: any;
  payment: any;
}

export interface ApplePayTransactionInput {
  product?: Product;
  cart?: Cart;
  quantity?: number;
  countryCode?: string;
}

export interface ApplePayObservableConfig {
  request: any;
  validateMerchant: (event: any) => Observable<any>;
  shippingContactSelected: (event: any) => Observable<any>;
  paymentMethodSelected: (event: any) => Observable<any>;
  shippingMethodSelected: (event: any) => Observable<any>;
  paymentAuthorized: (event: any) => Observable<any>;
}

export enum ApplePayEvent {
  VALIDATE_MERCHANT = 'validatemerchant',
  CANCEL = 'cancel',
  PAYMENT_METHOD_SELECTED = 'paymentmethodselected',
  SHIPPING_CONTACT_SELECTED = 'shippingcontactselected',
  SHIPPING_METHOD_SELECTED = 'shippingmethodselected',
  PAYMENT_AUTHORIZED = 'paymentauthorized',
}

export enum OpfQuickBuyLocation {
  CART = 'CART',
  PRODUCT = 'PRODUCT',
}

export enum OpfQuickBuyDeliveryType {
  SHIPPING = 'SHIPPING',
  PICKUP = 'PICKUP',
}

export const ADDRESS_FIELD_PLACEHOLDER = '[FIELD_NOT_SET]';

// Mirror ApplePayShippingType type from applepayjs
export enum ApplePayShippingType {
  SHIPPING = 'shipping',
  DELIVERY = 'delivery',
  STORE_PICKUP = 'storePickup',
  SERVICE_PICKUP = 'servicePickup',
}

export const defaultMerchantName: string = 'Store';
