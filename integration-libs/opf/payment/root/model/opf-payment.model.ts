/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

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
  pattern?: string;
  destination?: PaymentDestination;
  dynamicScript?: PaymentDynamicScript;
}

export interface PaymentDestination {
  url?: string;
  method?: string;
  contentType?: string;
  body?: string;
  authenticationIds?: number[];
  form?: PaymentSessionFormField[];
}

export interface PaymentDynamicScript {
  cssUrls?: PaymentDynamicScriptResource[];
  jsUrls?: PaymentDynamicScriptResource[];
  html?: string;
}

export interface PaymentDynamicScriptResource {
  url?: string;
  type?: PaymentDynamicScriptResourceType;
}

export enum PaymentDynamicScriptResourceType {
  SCRIPT = 'SCRIPT',
  STYLES = 'STYLES',
}
