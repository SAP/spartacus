/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OrderEntry } from '@spartacus/cart/base/root';
import { PaginationModel, Price, Principal, SortModel } from '@spartacus/core';
import { Observable } from 'rxjs';

export interface OccQuote {
  allowedActions: QuoteActionType[];
  cartId?: string;
  code: string;
  comments: Comment[];
  creationTime?: Date;
  description: string;
  entries?: OrderEntry[];
  expirationTime?: Date;
  name: string;
  orderDiscounts?: Price;
  previousEstimatedTotal?: Price;
  productDiscounts?: Price;
  quoteDiscounts?: Price;
  state?: QuoteState;
  subTotalWithDiscounts?: Price;
  threshold?: number;
  totalItems?: number;
  totalPrice: Price;
  totalPriceWithTax?: Price;
  updatedTime?: Date;
  version?: number;
}

export type Quote = Omit<OccQuote, 'allowedActions'> & {
  allowedActions: QuoteAction[];
  isEditable: boolean;
};

export interface QuoteAction {
  type: QuoteActionType;
  isPrimary: boolean;
}

export interface Comment {
  author?: Principal;
  creationDate?: Date;
  fromCustomer?: boolean;
  text?: string;
}

export enum QuoteActionType {
  CREATE = 'CREATE',
  VIEW = 'VIEW',
  SUBMIT = 'SUBMIT',
  SAVE = 'SAVE',
  EDIT = 'EDIT',
  DISCOUNT = 'DISCOUNT',
  CANCEL = 'CANCEL',
  CHECKOUT = 'CHECKOUT',
  ORDER = 'ORDER',
  APPROVE = 'APPROVE',
  REJECT = 'REJECT',
  EXPIRED = 'EXPIRED',
  REQUOTE = 'REQUOTE',
}

export enum QuoteState {
  BUYER_DRAFT = 'BUYER_DRAFT',
  BUYER_SUBMITTED = 'BUYER_SUBMITTED',
  BUYER_ACCEPTED = 'BUYER_ACCEPTED',
  BUYER_APPROVED = 'BUYER_APPROVED',
  BUYER_REJECTED = 'BUYER_REJECTED',
  BUYER_OFFER = 'BUYER_OFFER',
  BUYER_ORDERED = 'BUYER_ORDERED',
  SELLER_DRAFT = 'SELLER_DRAFT',
  SELLER_REQUEST = 'SELLER_REQUEST',
  SELLER_SUBMITTED = 'SELLER_SUBMITTED',
  SELLERAPPROVER_PENDING = 'SELLERAPPROVER_PENDING',
  SELLERAPPROVER_APPROVED = 'SELLERAPPROVER_APPROVED',
  SELLERAPPROVER_REJECTED = 'SELLERAPPROVER_REJECTED',
  CANCELLED = 'CANCELLED',
  EXPIRED = 'EXPIRED',
}

export interface QuoteDiscount {
  discountRate: number;
  discountType: string;
}

export interface QuoteList {
  pagination: PaginationModel;
  sorts?: SortModel[];
  quotes: Quote[];
}

export interface QuoteMetadata {
  description?: string;
  expirationTime?: Date;
  name?: string;
}

export interface QuoteStarter {
  cartId?: string;
  quoteCode?: string;
}

export type QuoteActionsByState = { [key in QuoteState]: QuoteActionType[] };

export interface QuotesStateParams {
  currentPage$: Observable<number>;
  sort$: Observable<string>;
}
