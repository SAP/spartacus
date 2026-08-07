/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Cart, DeliveryMode } from '@spartacus/cart/base/root';
import { Address } from '@spartacus/core';
import {
  OpfDynamicScript,
  OpfErrorDialogOptions,
  OpfKeyValueMap,
} from '@spartacus/opf/base/root';
import {
  OpfPaymentVerificationPayload,
  OpfPaymentVerificationResponse,
} from './opf-payment-verification.model';

export type OpfPaymentMerchantCallback = (
  response?: OpfPaymentSubmitResponse | OpfPaymentSubmitCompleteResponse
) => void | Promise<void>;

export interface OpfPaymentGlobalMethods {
  getRedirectParams?(): Array<OpfKeyValueMap>;
  submit?(options: {
    /** @deprecated Property no longer used. Cart ID is currently derived from the OTP access code header. */
    cartId?: string;
    additionalData: Array<OpfKeyValueMap>;
    submitSuccess: OpfPaymentMerchantCallback;
    submitPending: OpfPaymentMerchantCallback;
    submitFailure: OpfPaymentMerchantCallback;
    submitCancel?: OpfPaymentMerchantCallback;
    paymentMethod: OpfPaymentMethod;
    paymentSessionId?: string;
  }): Promise<boolean>;
  submitComplete?(options: {
    /** @deprecated Property no longer used. Cart ID is currently derived from the OTP access code header. */
    cartId?: string;
    additionalData: Array<OpfKeyValueMap>;
    submitSuccess: OpfPaymentMerchantCallback;
    submitPending: OpfPaymentMerchantCallback;
    submitFailure: OpfPaymentMerchantCallback;
    submitCancel?: OpfPaymentMerchantCallback;
    paymentSessionId?: string;
  }): Promise<boolean>;
  submitCompleteRedirect?(options: {
    /** @deprecated Property no longer used. Cart ID is currently derived from the OTP access code header. */
    cartId?: string;
    additionalData: Array<OpfKeyValueMap>;
    submitSuccess: OpfPaymentMerchantCallback;
    submitPending: OpfPaymentMerchantCallback;
    submitFailure: OpfPaymentMerchantCallback;
  }): Promise<boolean>;
  throwPaymentError?(errorOptions?: OpfErrorDialogOptions): void;
  startLoadIndicator?(): void;
  stopLoadIndicator?(): void;
  scriptReady?(scriptIdentifier: string): void;
  reinitiatePaymentForm?(paymentOptionId?: number): Promise<boolean>;
  getCart?(cartId?: string): Promise<Cart | undefined>;
  setBillingAddress?(address: Address): Promise<unknown>;
  getBillingAddress?(): Promise<Address | undefined>;
  setDeliveryAddress?(address: Address): Promise<string>;
  getDeliveryAddress?(): Promise<Address | undefined>;
  setDeliveryMode?(mode: string): Promise<DeliveryMode | undefined>;
  getDeliveryMode?(): Promise<DeliveryMode | undefined>;
  deleteAddress?(addressId: string): Promise<void>;
  /**
   * Starts a new payment session for a configuration.
   *
   * Should be used when no payment session exists yet,
   * or when they intentionally want to bootstrap a fresh session.
   */
  initiatePayment?(
    configurationIdOrPaymentConfig: string | number | OpfPaymentConfig
  ): Promise<OpfPaymentSessionData>;
  /**
   * Updates an existing payment transaction/session.
   *
   * Should be used for subsequent updates once a
   * payment session ID is available.
   */
  updatePaymentTransaction?(
    updatePaymentConfig: OpfPaymentUpdateConfig
  ): Promise<OpfPaymentSessionData>;
  verifyPayment?(
    paymentSessionId: string,
    paymentVerificationPayload: OpfPaymentVerificationPayload
  ): Promise<OpfPaymentVerificationResponse>;
  updateCartGuestUserEmail?(email: string): Promise<boolean>;
  createCartGuestUser?(): Promise<boolean>;
  handle3DSRedirect?(threeDsURL: string): Promise<void>;
}

export interface OpfPaymentBrowserInfo {
  acceptHeader?: string;
  colorDepth?: number;
  javaEnabled?: boolean;
  javaScriptEnabled?: boolean;
  language?: string;
  screenHeight?: number;
  screenWidth?: number;
  userAgent?: string;
  timeZoneOffset?: number;
  ipAddress?: string;
  originUrl?: string;
}

export interface OpfPaymentSubmitRequest {
  browserInfo?: OpfPaymentBrowserInfo;
  paymentMethod?: string;
  encryptedToken?: string;
  channel?: string;
  additionalData?: Array<OpfKeyValueMap>;
  savePaymentMethod?: boolean;
}

export interface OpfPaymentSubmitInput {
  additionalData: Array<OpfKeyValueMap>;
  paymentSessionId?: string;
  callbacks: {
    onSuccess: OpfPaymentMerchantCallback;
    onPending: OpfPaymentMerchantCallback;
    onFailure: OpfPaymentMerchantCallback;
  };
  returnPath?: string;
  paymentMethod: OpfPaymentMethod;
  encryptedToken?: string;
  savePaymentMethod?: boolean;
  /**
   * Optional cart ID used to resolve the cart access code.
   * When omitted, the active cart ID is used.
   */
  cartId?: string;
}

export enum OpfPaymentChannel {
  BROWSER = 'BROWSER',
}

export enum OpfPaymentSubmitStatus {
  REJECTED = 'REJECTED',
  ACCEPTED = 'ACCEPTED',
  PENDING = 'PENDING',
  DELAYED = 'DELAYED',
  CANCELLED = 'CANCELLED',
}

export enum OpfPaymentMethod {
  CREDIT_CARD = 'CREDIT_CARD',
}
export interface OpfPaymentSubmitResponse {
  cartId: string;
  status: OpfPaymentSubmitStatus;
  reasonCode: string;
  paymentMethod: OpfPaymentMethod;
  authorizedAmount: number;
  customFields: Array<OpfKeyValueMap>;
}

export interface OpfPaymentSubmitCompleteResponse {
  cartId: string;
  status: OpfPaymentSubmitStatus;
  reasonCode: number;
  customFields: Array<OpfKeyValueMap>;
}

export interface OpfPaymentSubmitCompleteRequest {
  paymentSessionId?: string;
  additionalData?: Array<OpfKeyValueMap>;
}
export interface OpfPaymentSubmitCompleteInput {
  additionalData: Array<OpfKeyValueMap>;
  paymentSessionId: string;
  callbacks: {
    onSuccess: OpfPaymentMerchantCallback;
    onPending: OpfPaymentMerchantCallback;
    onFailure: OpfPaymentMerchantCallback;
  };
  returnPath?: string;
  /**
   * Optional cart ID used to resolve the cart access code.
   * When omitted, the active cart ID is used.
   */
  cartId?: string;
}

export interface OpfPaymentAfterRedirectScriptResponse {
  afterRedirectScript: OpfDynamicScript;
}

export interface OpfPaymentInitiationConfig {
  otpKey?: string;
  config?: OpfPaymentConfig;
}

export interface OpfPaymentUpdateConfig {
  paymentSessionId: string;
  otpKey?: string;
  config?: OpfPaymentUpdatePayload;
}

export interface OpfPaymentUpdatePayload {
  channel?: string;
  browserInfo?: OpfPaymentBrowserInfo;
  additionalData?: Array<OpfKeyValueMap>;
}

export interface OpfPaymentConfig {
  configurationId?: string;
  /** @deprecated Property no longer used. Cart ID is currently derived from the OTP access code header. */
  cartId?: string;
  resultURL?: string;
  cancelURL?: string;
  channel?: string;
  browserInfo?: OpfPaymentBrowserInfo;
}

export interface OpfPaymentSessionFormField {
  name?: string;
  value?: string;
}

export interface OpfPaymentSessionData {
  paymentSessionId?: string;
  relayResultUrl?: string;
  relayCancelUrl?: string;
  paymentIntent?: string;
  pattern?: OpfPaymentRenderPattern;
  destination?: OpfPaymentDestination;
  dynamicScript?: OpfDynamicScript;
  paymentOptionId?: number;
}

export interface OpfPaymentDestination {
  url?: string;
  method?: string;
  contentType?: string;
  body?: string;
  authenticationIds?: number[];
  form?: OpfPaymentSessionFormField[];
}

export enum OpfPaymentRenderPattern {
  IFRAME = 'IFRAME',
  FULL_PAGE = 'FULL_PAGE',
  HOSTED_FIELDS = 'HOSTED_FIELDS',
}

export interface OpfPaymentRenderMethodEvent {
  isLoading: boolean;
  isError: boolean;
  renderType?: OpfPaymentRenderPattern;
  html?: string | null;
  destination?: OpfPaymentDestination;
  paymentOptionId?: number;
}

export interface OpfPaymentMethodDetails {
  code?: string;
  name?: string;
}
