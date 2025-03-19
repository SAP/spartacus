/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  OpfDynamicScript,
  OpfErrorDialogOptions,
  OpfKeyValueMap,
} from '@spartacus/opf/base/root';

export type OpfPaymentMerchantCallback = (
  response?: OpfPaymentSubmitResponse | OpfPaymentSubmitCompleteResponse
) => void | Promise<void>;

export interface OpfPaymentGlobalMethods {
  getRedirectParams?(): Array<OpfKeyValueMap>;
  submit?(options: {
    cartId: string;
    additionalData: Array<OpfKeyValueMap>;
    submitSuccess: OpfPaymentMerchantCallback;
    submitPending: OpfPaymentMerchantCallback;
    submitFailure: OpfPaymentMerchantCallback;
    paymentMethod: OpfPaymentMethod;
  }): Promise<boolean>;
  submitComplete?(options: {
    cartId: string;
    additionalData: Array<OpfKeyValueMap>;
    submitSuccess: OpfPaymentMerchantCallback;
    submitPending: OpfPaymentMerchantCallback;
    submitFailure: OpfPaymentMerchantCallback;
  }): Promise<boolean>;
  submitCompleteRedirect?(options: {
    cartId: string;
    additionalData: Array<OpfKeyValueMap>;
    submitSuccess: OpfPaymentMerchantCallback;
    submitPending: OpfPaymentMerchantCallback;
    submitFailure: OpfPaymentMerchantCallback;
  }): Promise<boolean>;
  throwPaymentError?(errorOptions?: OpfErrorDialogOptions): void;
  startLoadIndicator?(): void;
  stopLoadIndicator?(): void;
  scriptReady?(scriptIdentifier: string): void;
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
}

export enum OpfPaymentSubmitStatus {
  REJECTED = 'REJECTED',
  ACCEPTED = 'ACCEPTED',
  PENDING = 'PENDING',
  DELAYED = 'DELAYED',
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
}

export interface OpfPaymentAfterRedirectScriptResponse {
  afterRedirectScript: OpfDynamicScript;
}

export interface OpfPaymentInitiationConfig {
  otpKey?: string;
  config?: OpfPaymentConfig;
}

export interface OpfPaymentConfig {
  configurationId?: string;
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
}

export interface OpfPaymentMethodDetails {
  code?: string;
  name?: string;
}
