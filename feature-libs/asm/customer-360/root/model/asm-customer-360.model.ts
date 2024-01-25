/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Address, Country, Region, UrlCommand, User } from '@spartacus/core';

export interface AsmCustomer360Review {
  productName: string;
  productCode: string;
  createdAt: string;
  updatedAt: string;
  rating: string;
  reviewStatus: string;
  reviewText: string;
  localizedReviewStatus: string;
}

export interface AsmCustomer360ActivityStatus {
  code: string;
  name: string;
}

export interface AsmCustomer360ActivityType {
  code: string;
  name: string;
}

export interface AsmCustomer360Activity {
  type: AsmCustomer360ActivityType;
  associatedTypeId: string;
  description: string;
  status?: AsmCustomer360ActivityStatus;
  createdAt: string;
  updatedAt: string;
}

export interface AsmCustomer360Coupon {
  applied: boolean;
  code: string;
  name?: string;
}

export interface AsmCustomer360Promotion {
  applied: boolean;
  code: string;
  name?: string;
  message?: string;
}

export interface AsmCustomer360CustomerCoupon {
  code: string;
  name?: string;
  description?: string;
}

export interface C360TicketStatus {
  code: string;
  name: string;
}

export interface C360TicketCategory {
  code: string;
  name: string;
}

export interface AsmCustomer360SupportTicket {
  id: string;
  subject: string;
  category: C360TicketCategory;
  createdAt: string;
  updatedAt: string;
  status: C360TicketStatus;
}

export enum AsmCustomer360Type {
  REVIEW_LIST = 'c360ReviewList',
  STORE_LOCATION = 'c360StoreLocation',
  PRODUCT_INTEREST_LIST = 'c360CustomerProductInterestList',
  SUPPORT_TICKET_LIST = 'c360TicketList',
  CUSTOMER_PROFILE = 'c360CustomerProfile',
  ACTIVE_CART = 'c360Cart',
  SAVED_CART = 'c360SavedCart',
  OVERVIEW = 'c360Overview',
  ACTIVITY_LIST = 'c360ActivityList',
  COUPON_LIST = 'c360CouponList',
  PROMOTION_LIST = 'c360PromotionList',
  CUSTOMER_COUPON_LIST = 'c360CustomerCouponList',
}

export interface AsmCustomer360SupportTicketList {
  type: AsmCustomer360Type.SUPPORT_TICKET_LIST;
  tickets: Array<AsmCustomer360SupportTicket>;
}

export interface AsmCustomer360ReviewList {
  type: AsmCustomer360Type.REVIEW_LIST;
  reviews: Array<AsmCustomer360Review>;
}

export interface AsmCustomer360StoreLocation {
  type: AsmCustomer360Type.STORE_LOCATION;
  address: string;
}

export interface AsmCustomer360Address {
  id?: string;
  line1?: string;
  line2?: string;
  town?: string;
  region?: Region;
  country?: Country;
}

export interface AsmCustomerCardType {
  code?: string;
  name?: string;
}

export interface AsmCustomer360PaymentDetail {
  id?: string;
  cardType?: AsmCustomerCardType;
  cardNumber?: string;
  expiryMonth?: string;
  expiryYear?: string;
  defaultPayment?: boolean;
}

export enum PaymentCardCode {
  VISA = 'visa',
  MASTER = 'master',
  MASTERCARD_EUROCARD = 'mastercard_eurocard',
  DINERS = 'diners',
  AMEX = 'amex',
}

export enum KeyBoardEventCode {
  ARROW_LEFT = 'ArrowLeft',
  ARROW_RIGHT = 'ArrowRight',
  ARROW_DOWN = 'ArrowDown',
  ARROW_UP = 'ArrowUp',
  HOME = 'Home',
  END = 'End',
  PAGE_DOWN = 'PageDown',
  PAGE_UP = 'PageUp',
}

export interface AsmCustomer360Profile {
  billingAddress?: AsmCustomer360Address;
  deliveryAddress?: AsmCustomer360Address;
  phone1?: string;
  phone2?: string;
  paymentDetails?: AsmCustomer360PaymentDetail[];
}

export interface AsmCustomer360CustomerProfile {
  type: AsmCustomer360Type.CUSTOMER_PROFILE;
  profile?: AsmCustomer360Profile;
}

export interface AsmCustomer360ProductInterestList {
  type: AsmCustomer360Type.PRODUCT_INTEREST_LIST;
  customerProductInterests: Array<{
    product: {
      code: string;
    };
  }>;
}

export interface AsmCustomer360CartEntry {
  quantity: number;
  basePrice: string;
  totalPrice: string;
  productCode: string;
}
export interface CustomerCart {
  code?: string;
  totalPrice?: string;
  totalItemCount?: number;
  entries?: Array<AsmCustomer360CartEntry>;
}
export interface AsmCustomer360ActiveCart {
  type: AsmCustomer360Type.ACTIVE_CART;
  cart?: CustomerCart;
}

export interface AsmCustomer360SavedCart {
  type: AsmCustomer360Type.SAVED_CART;
  savedCart?: CustomerCart;
}

export interface AsmCustomer360Avatar {
  url?: string;
  format?: string;
}

export interface AsmCustomerOverview {
  address?: Address;
  name?: string;
  cartSize?: number;
  cartCode?: string;
  latestOrderTotal?: string;
  latestOrderCode?: string;
  latestOrderTime?: string;
  latestOpenedTicketId?: string;
  latestOpenedTicketCreatedAt?: string;
  email?: string;
  signedUpAt?: string;
  defaultShippingAddress?: Address;
  userAvatar?: AsmCustomer360Avatar;
}

export interface AsmCustomer360Overview {
  type: AsmCustomer360Type.OVERVIEW;
  overview?: AsmCustomerOverview;
}

export interface AsmCustomer360ActivityList {
  type: AsmCustomer360Type.ACTIVITY_LIST;
  activities: Array<AsmCustomer360Activity>;
}

export interface AsmCustomer360CouponList {
  type: AsmCustomer360Type.COUPON_LIST;
  coupons: Array<AsmCustomer360Coupon>;
}

export interface AsmCustomer360PromotionList {
  type: AsmCustomer360Type.PROMOTION_LIST;
  promotions: Array<AsmCustomer360Promotion>;
}

export interface AsmCustomer360CustomerCouponList {
  type: AsmCustomer360Type.CUSTOMER_COUPON_LIST;
  customerCoupons: Array<AsmCustomer360CustomerCoupon>;
}

export interface AsmCustomer360Params {
  userId: string;
}

export interface AdditionalRequestParameters {
  timeout?: number;
  listSize?: number;
  searchQuery?: string;
  assignable?: boolean;
}

export interface AsmCustomer360Query {
  type?: AsmCustomer360Type | string;
  additionalRequestParameters?: AdditionalRequestParameters;
}

export interface AsmCustomer360Request {
  queries: Array<AsmCustomer360Query>;
  options: AsmCustomer360Params;
}

export type AsmCustomer360Data =
  | AsmCustomer360ActiveCart
  | AsmCustomer360ProductInterestList
  | AsmCustomer360ReviewList
  | AsmCustomer360StoreLocation
  | AsmCustomer360SupportTicketList
  | AsmCustomer360CustomerProfile
  | AsmCustomer360SavedCart
  | AsmCustomer360Overview
  | AsmCustomer360ActivityList
  | AsmCustomer360CouponList
  | AsmCustomer360PromotionList
  | AsmCustomer360CustomerCouponList;

export interface AsmCustomer360Response {
  value: Array<AsmCustomer360Data>;
}

export enum AsmDialogActionType {
  NAVIGATE = 'NAVIGATE',
}

export interface AsmDialogActionEvent {
  selectedUser: User;
  actionType: AsmDialogActionType;
  route?: UrlCommand;
}
