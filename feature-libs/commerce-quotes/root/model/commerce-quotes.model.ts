import { OrderEntry } from '@spartacus/cart/base/root';
import { PaginationModel, Price, Principal, SortModel } from '@spartacus/core';

export interface Quote {
  allowedActions?: string[];
  cartId?: string;
  code: string;
  comments?: Comment[];
  creationTime?: Date;
  description?: string;
  entries?: OrderEntry[];
  expirationTime?: Date;
  name?: string;
  orderDiscounts?: Price;
  previousEstimatedTotal?: Price;
  productDiscounts?: Price;
  quoteDiscounts?: Price;
  state?: string;
  subTotalWithDiscounts?: Price;
  threshold?: number;
  totalItems?: number;
  totalPrice?: Price;
  totalPriceWithTax?: Price;
  updatedTime?: Date;
  version?: number;
}

export interface Comment {
  author?: Principal;
  creationDate?: Date;
  fromCustomer?: boolean;
  text?: string;
}

export interface QuoteAction {
  action: string;
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
  name: string;
}

export interface QuoteStarter {
  cartId?: string;
  quoteCode?: string;
}
