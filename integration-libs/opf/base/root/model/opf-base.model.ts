/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export interface OpfActiveConfigurationsResponse {
  value?: OpfActiveConfiguration[];
  page?: OpfActiveConfigurationsPagination;
}

export interface OpfActiveConfiguration {
  description?: string;
  id?: number;
  merchantId?: string;
  providerType?: OpfPaymentProviderType;
  displayName?: string;
  acquirerCountryCode?: string;
  logoUrl?: string;
}

export interface OpfActiveConfigurationsPagination {
  number?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
}

export interface OpfActiveConfigurationsQuery {
  /**
   * The page number to be retrieved based on the total number of pages.
   */
  pageNumber?: number;
  /**
   * The number of records retrieved at one time.
   */
  pageSize?: number;
}
export interface OpfDynamicScript {
  cssUrls?: OpfDynamicScriptResource[];
  jsUrls?: OpfDynamicScriptResource[];
  html?: string;
}

export interface OpfKeyValueMap {
  key: string;
  value: string;
}

export interface OpfDynamicScriptResource {
  url?: string;
  sri?: string;
  attributes?: OpfKeyValueMap[];
  type?: OpfDynamicScriptResourceType;
}

export enum OpfPage {
  CHECKOUT_REVIEW_PAGE = 'opfCheckoutPaymentAndReview',
  CONFIRMATION_PAGE = 'orderConfirmation',
  RESULT_PAGE = 'paymentVerificationResult',
  CART_PAGE = 'cart',
}

export enum OpfDynamicScriptResourceType {
  SCRIPT = 'SCRIPT',
  STYLES = 'STYLES',
}

export enum OpfPaymentProviderType {
  PAYMENT_GATEWAY = 'PAYMENT_GATEWAY',
  PAYMENT_METHOD = 'PAYMENT_METHOD',
}
