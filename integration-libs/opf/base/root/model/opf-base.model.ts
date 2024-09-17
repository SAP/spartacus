/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ActiveConfiguration {
  description?: string;
  id?: number;
  merchantId?: string;
  providerType?: OpfPaymentProviderType;
  displayName?: string;
  acquirerCountryCode?: string;
}

export interface OpfDynamicScript {
  cssUrls?: OpfDynamicScriptResource[];
  jsUrls?: OpfDynamicScriptResource[];
  html?: string;
}

export interface KeyValuePair {
  key: string;
  value: string;
}

export interface OpfDynamicScriptResource {
  url?: string;
  sri?: string;
  attributes?: KeyValuePair[];
  type?: OpfDynamicScriptResourceType;
}

export enum OpfDynamicScriptResourceType {
  SCRIPT = 'SCRIPT',
  STYLES = 'STYLES',
}

export enum OpfPaymentProviderType {
  PAYMENT_GATEWAY = 'PAYMENT_GATEWAY',
  PAYMENT_METHOD = 'PAYMENT_METHOD',
}
