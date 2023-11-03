/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpfDynamicScript } from './opf.model';

export interface DigitalWalletQuickBuy {
  description?: string;
  provider?: OpfProviderType;
  enabled?: boolean;
  merchantId?: string;
  merchantName?: string;
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
  orderId?: string;
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

export interface CTAProductInfo extends CTAProductItem {
  price?: Price;
}

export interface Price {
  // cogs?: number;
  // msrp?: number;
  // originalPrice?: number;
  sellingPrice?: number;
  // surcharge?: PriceSurcharge;
  // pricebook?: PricebookIdentifiable;
  // variantDetails?: VariantDetails;
  // bulkPricing?: BulkPricing;
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

export enum PaymentProvider {
  ADYEN = 'ADYEN',
  CYBERSOURCE = 'CYBERSOURCE',
  PAYMENT_GATEWAY = 'PAYMENT_GATEWAY',
  PAYMENT_METHOD = 'PAYMENT_METHOD',
  UPSCALE_GATEWAY = 'UPSCALE_GATEWAY',
}

export interface ShippingMethodData {
  id: string;
  name: string;
  defaultFlag: boolean;
}

export interface AddressDto {
  firstName?: string;
  lastName?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  country?: string;
  zip?: string;
  phoneNumber?: string;
  emailAddress?: string;
}

export interface CopyProductData {
  name?: string;
  price?: number;
}
export interface OrderLineData {
  lineTotal?: number;
  lineTax?: number;
  lineShFeeTax?: number;
  unitPrice?: number;
  unitPriceWithTax?: number;
  lineDiscount?: number;
  lineSubTotalWithTax?: number;
  lineTotalDiscount?: number;
  lineTaxPercent?: number;
  lineShFeeTaxPercent?: number;
  productId?: string;
  productName?: string;
  quantity?: number;
  productDescription?: string;
  deliveryMethod?: string;
  copyProduct?: CopyProductData;
}

export interface OrderData {
  orderId: string;
  divisionId?: string;
  currency?: string;
  total?: number;
  subTotalWithTax?: number;
  totalDiscount?: number;
  shFeeTax?: number;
  shFeeWithTax?: number;
  customerEmail?: string;
  shippingMethod?: ShippingMethodData;
  billingAddress?: AddressDto;
  shippingAddress?: AddressDto;
  orderLines?: Array<OrderLineData>;
}
