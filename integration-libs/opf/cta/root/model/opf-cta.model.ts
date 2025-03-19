/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpfDynamicScript } from '@spartacus/opf/base/root';

export type OpfCtaAdditionalDataKey =
  | 'divisionId'
  | 'experienceId'
  | 'currency'
  | 'fulfillmentLocationId'
  | 'locale'
  | 'scriptIdentifier';

export interface OpfCtaScriptsRequest {
  paymentAccountIds?: Array<number>;
  cartId?: string;
  ctaProductItems?: Array<OpfCtaProductItem>;
  scriptLocations?: Array<OpfCtaScriptsLocation>;
  additionalData?: Array<{
    key: OpfCtaAdditionalDataKey;
    value: string;
  }>;
}
export interface OpfCtaProductItem {
  productId: string;
  quantity: number;
  fulfillmentLocationId?: string;
}

export enum OpfCtaScriptsLocation {
  CART_MESSAGING = 'CART_MESSAGING',
  PDP_MESSAGING = 'PDP_MESSAGING',
  ORDER_CONFIRMATION_PAYMENT_GUIDE = 'ORDER_CONFIRMATION_PAYMENT_GUIDE',
  ORDER_HISTORY_PAYMENT_GUIDE = 'ORDER_HISTORY_PAYMENT_GUIDE',
}

export enum OpfCtaCmsPageLocation {
  ORDER_CONFIRMATION_PAGE = 'orderConfirmationPage',
  ORDER_PAGE = 'order',
  PDP_PAGE = 'productDetails',
  CART_PAGE = 'cartPage',
}

export interface OpfCtaScriptsResponse {
  value: Array<OpfCtaScript>;
}

export interface OpfCtaScript {
  paymentAccountId: number;
  dynamicScript: OpfDynamicScript;
}

export enum OpfCtaEvent {
  OPF_CART_CHANGED = 'opfCartChanged',
  OPF_PRODUCT_AMOUNT_CHANGED = 'opfProductAmountChanged',
}

export const OpfCtaDynamicLocations: Array<OpfCtaScriptsLocation> = [
  OpfCtaScriptsLocation.CART_MESSAGING,
  OpfCtaScriptsLocation.PDP_MESSAGING,
];
