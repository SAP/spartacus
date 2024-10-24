/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ErrorDialogOptions, OpfDynamicScript } from '@spartacus/opf/base/root';

export interface KeyValuePair {
  key: string;
  value: string;
}

export type MerchantCallback = (
  response?: SubmitResponse | SubmitCompleteResponse
) => void | Promise<void>;

export interface GlobalOpfPaymentMethods {
  getRedirectParams?(): Array<KeyValuePair>;
  submit?(options: {
    cartId: string;
    additionalData: Array<KeyValuePair>;
    submitSuccess: MerchantCallback;
    submitPending: MerchantCallback;
    submitFailure: MerchantCallback;
    paymentMethod: PaymentMethod;
  }): Promise<boolean>;
  submitComplete?(options: {
    cartId: string;
    additionalData: Array<KeyValuePair>;
    submitSuccess: MerchantCallback;
    submitPending: MerchantCallback;
    submitFailure: MerchantCallback;
  }): Promise<boolean>;
  submitCompleteRedirect?(options: {
    cartId: string;
    additionalData: Array<KeyValuePair>;
    submitSuccess: MerchantCallback;
    submitPending: MerchantCallback;
    submitFailure: MerchantCallback;
  }): Promise<boolean>;
  throwPaymentError?(errorOptions?: ErrorDialogOptions): void;
  startLoadIndicator?(): void;
  stopLoadIndicator?(): void;
  scriptReady?(scriptIdentifier: string): void;
}

export interface PaymentBrowserInfo {
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

export interface SubmitRequest {
  browserInfo?: PaymentBrowserInfo;
  paymentMethod?: string;
  encryptedToken?: string;
  cartId?: string;
  channel?: string;
  additionalData?: Array<KeyValuePair>;
}

export interface SubmitInput {
  additionalData: Array<KeyValuePair>;
  paymentSessionId?: string;
  cartId: string;
  callbackArray: [MerchantCallback, MerchantCallback, MerchantCallback];
  returnPath?: string;
  paymentMethod: PaymentMethod;
  encryptedToken?: string;
}

export enum SubmitStatus {
  REJECTED = 'REJECTED',
  ACCEPTED = 'ACCEPTED',
  PENDING = 'PENDING',
  DELAYED = 'DELAYED',
}
export enum PaymentMethod {
  CREDIT_CARD = 'CREDIT_CARD',
}
export interface SubmitResponse {
  cartId: string;
  status: SubmitStatus;
  reasonCode: string;
  paymentMethod: PaymentMethod;
  authorizedAmount: number;
  customFields: Array<KeyValuePair>;
}

export interface SubmitCompleteResponse {
  cartId: string;
  status: SubmitStatus;
  reasonCode: number;
  customFields: Array<KeyValuePair>;
}

export interface SubmitCompleteRequest {
  paymentSessionId?: string;
  additionalData?: Array<KeyValuePair>;
  cartId?: string;
}
export interface SubmitCompleteInput {
  additionalData: Array<KeyValuePair>;
  paymentSessionId: string;
  cartId: string;
  callbackArray: [MerchantCallback, MerchantCallback, MerchantCallback];
  returnPath?: string;
}

export interface AfterRedirectScriptResponse {
  afterRedirectScript: OpfDynamicScript;
}

export const defaultErrorDialogOptions: ErrorDialogOptions = {
  messageKey: 'opfPayment.errors.proceedPayment',
  confirmKey: 'common.continue',
};

export enum OpfPage {
  CHECKOUT_REVIEW_PAGE = 'opfCheckoutPaymentAndReview',
  CONFIRMATION_PAGE = 'orderConfirmation',
  RESULT_PAGE = 'paymentVerificationResult',
  CART_PAGE = 'cart',
}

export enum GlobalFunctionsDomain {
  CHECKOUT = 'checkout',
  GLOBAL = 'global',
  REDIRECT = 'redirect',
}

export interface PaymentInitiationConfig {
  otpKey?: string;
  config?: PaymentConfig;
}

export interface PaymentConfig {
  configurationId?: string;
  cartId?: string;
  resultURL?: string;
  cancelURL?: string;
  channel?: string;
  browserInfo?: PaymentBrowserInfo;
}

export interface PaymentBrowserInfo {
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

export interface PaymentSessionFormField {
  name?: string;
  value?: string;
}

export interface PaymentSessionData {
  paymentSessionId?: string;
  relayResultUrl?: string;
  relayCancelUrl?: string;
  paymentIntent?: string;
  pattern?: PaymentPattern;
  destination?: PaymentDestination;
  dynamicScript?: OpfDynamicScript;
}

export interface PaymentDestination {
  url?: string;
  method?: string;
  contentType?: string;
  body?: string;
  authenticationIds?: number[];
  form?: PaymentSessionFormField[];
}

export enum PaymentPattern {
  IFRAME = 'IFRAME',
  FULL_PAGE = 'FULL_PAGE',
  HOSTED_FIELDS = 'HOSTED_FIELDS',
}

export interface OpfRenderPaymentMethodEvent {
  isLoading: boolean;
  isError: boolean;
  renderType?: PaymentPattern;
  data?: string | null;
  destination?: PaymentDestination;
}
