/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpfDynamicScript } from './opf.model';

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
