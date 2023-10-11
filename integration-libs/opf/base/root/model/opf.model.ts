/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ViewContainerRef } from '@angular/core';

export interface OpfRenderPaymentMethodEvent {
  isLoading: boolean;
  isError: boolean;
  renderType?: OpfPaymentMethodType | null;
  data?: string | null;
}

export enum OpfPaymentMethodType {
  DESTINATION = 'DESTINATION',
  DYNAMIC_SCRIPT = 'DYNAMIC_SCRIPT',
}

export interface OpfPaymentMetadata {
  termsAndConditionsChecked: boolean;
  selectedPaymentOptionId: number | undefined;
  isPaymentInProgress: boolean;
}

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
  paymentSessionId: string;
  cartId: string;
  callbackArray: [MerchantCallback, MerchantCallback, MerchantCallback];
  returnPath?: string;
  paymentMethod: PaymentMethod;
}

export enum SubmitStatus {
  REJECTED = 'REJECTED',
  ACCEPTED = 'ACCEPTED',
  PENDING = 'PENDING',
  DELAYED = 'DELAYED',
}
export enum PaymentMethod {
  APPLE_PAY = 'APPLE_PAY',
  CREDIT_CARD = 'CREDIT_CARD',
  GOOGLE_PAY = 'GOOGLE_PAY',
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

export interface OpfDynamicScript {
  cssUrls?: OpfDynamicScriptResource[];
  jsUrls?: OpfDynamicScriptResource[];
  html?: string;
}

export interface OpfDynamicScriptResource {
  url?: string;
  sri?: string;
  attributes?: KeyValuePair[];
  type?: AfterRedirectDynamicScriptResourceType;
}

export enum AfterRedirectDynamicScriptResourceType {
  SCRIPT = 'SCRIPT',
  STYLES = 'STYLES',
}

export interface GlobalFunctionsInput {
  paymentSessionId: string;
  vcr?: ViewContainerRef;
  paramsMap?: Array<KeyValuePair>;
  targetPage: TargetPage;
}

export enum TargetPage {
  CHECKOUT_REVIEW = 'CHECKOUT_REVIEW',
  RESULT = 'RESULT',
}

export type ErrorDialogOptions = {
  confirmString?: string;
  confirmKey?: string;
  confirmReplacements?: any;
  messageString?: string;
  messageKey?: string;
  messageReplacements?: any;
};

export const defaultErrorDialogOptions: ErrorDialogOptions = {
  messageKey: 'opf.payment.errors.proceedPayment',
  confirmKey: 'common.continue',
};
