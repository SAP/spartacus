/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Address,
  CommonOptions,
  CostCenter,
  Currency,
  PointOfService,
  Price,
  Principal,
  Product,
  Promotion,
} from '@spartacus/core';

export interface PromotionResult {
  consumedEntries?: PromotionOrderEntryConsumed[];
  description?: string;
  promotion?: Promotion;
}

export enum PromotionLocation {
  ActiveCart = 'CART',
  Checkout = 'CHECKOUT',
  Order = 'ORDER',
  SaveForLater = 'SAVE_FOR_LATER',
  SavedCart = 'SAVED_CART',
}

export interface Voucher {
  appliedValue?: Price;
  code?: string;
  currency?: Currency;
  description?: string;
  freeShipping?: boolean;
  name?: string;
  value?: number;
  valueFormatted?: string;
  valueString?: string;
  voucherCode?: string;
}

export interface DeliveryOrderEntryGroup {
  deliveryAddress?: Address;
  entries?: OrderEntry[];
  quantity?: number;
  totalPriceWithTax?: Price;
}

export interface PaymentType {
  code?: string;
  displayName?: string;
}

export interface SaveCartResult {
  savedCartData?: Cart;
}

export interface Cart {
  appliedOrderPromotions?: PromotionResult[];
  appliedProductPromotions?: PromotionResult[];
  appliedVouchers?: Voucher[];
  calculated?: boolean;
  code?: string;
  costCenter?: CostCenter;
  deliveryAddress?: Address;
  deliveryCost?: Price;
  deliveryItemsQuantity?: number;
  deliveryMode?: DeliveryMode;
  deliveryOrderGroups?: DeliveryOrderEntryGroup[];
  description?: string;
  entries?: OrderEntry[];
  expirationTime?: Date;
  guid?: string;
  name?: string;
  net?: boolean;
  orderDiscounts?: Price;
  paymentInfo?: PaymentDetails;
  paymentType?: PaymentType;
  pickupItemsQuantity?: number;
  pickupOrderGroups?: PickupOrderEntryGroup[];
  potentialOrderPromotions?: PromotionResult[];
  potentialProductPromotions?: PromotionResult[];
  productDiscounts?: Price;
  purchaseOrderNumber?: string;
  saveTime?: Date;
  savedBy?: Principal;
  site?: string;
  store?: string;
  subTotal?: Price;
  totalDiscounts?: Price;
  totalItems?: number;
  totalPrice?: Price;
  totalPriceWithTax?: Price;
  totalTax?: Price;
  totalUnitCount?: number;
  user?: Principal;
}

export interface CartModification {
  deliveryModeChanged?: boolean;
  entry?: OrderEntry;
  quantity?: number;
  quantityAdded?: number;
  statusCode?: string;
  statusMessage?: string;
}

export interface CartItemComponentOptions {
  isSaveForLater?: boolean;
  optionalBtn?: any;
  displayAddToCart?: boolean;
  addToCartString?: string;
}

export interface OrderEntry {
  orderCode?: string;
  basePrice?: Price;
  deliveryMode?: DeliveryMode;
  deliveryPointOfService?: PointOfService;
  entryNumber?: number;
  product?: Product;
  quantity?: number;
  totalPrice?: Price;
  updateable?: boolean;
  returnedItemsPrice?: Price;
  returnableQuantity?: number;
  cancelledItemsPrice?: Price;
  cancellableQuantity?: number;
  promotions?: PromotionResult[];
}

export interface PickupOrderEntryGroup {
  deliveryPointOfService?: PointOfService;
  distance?: number;
  entries?: OrderEntry[];
  quantity?: number;
  totalPriceWithTax?: Price;
}

export interface PromotionOrderEntryConsumed {
  adjustedUnitPrice?: number;
  code?: string;
  orderEntryNumber?: number;
  quantity?: number;
}

export interface ConsignmentEntry {
  orderEntry?: OrderEntry;
  quantity?: number;
  shippedQuantity?: number;
}

export interface DeliveryMode {
  code?: string;
  deliveryCost?: Price;
  description?: string;
  name?: string;
}

export interface CardType {
  code?: string;
  name?: string;
}
export interface PaymentDetails {
  accountHolderName?: string;
  billingAddress?: Address;
  cardNumber?: string;
  cardType?: CardType;
  cvn?: string;
  defaultPayment?: boolean;
  expiryMonth?: string;
  expiryYear?: string;
  id?: string;
  issueNumber?: string;
  saved?: boolean;
  startMonth?: string;
  startYear?: string;
  subscriptionId?: string;
}

export enum CartType {
  ACTIVE = 'Active',
  WISH_LIST = 'WishList',
  SELECTIVE = 'Selective',
  NEW_CREATED = 'NewCreated',
}

export interface CartModificationList {
  cartModifications?: CartModification[];
}

export enum CartValidationStatusCode {
  NO_STOCK = 'noStock',
  LOW_STOCK = 'lowStock',
  REVIEW_CONFIGURATION = 'reviewConfiguration',
  PRICING_ERROR = 'pricingError',
  UNRESOLVABLE_ISSUES = 'unresolvableIssues',
}

// TODO:#xxx - js docs
// TODO:#xxx - expose?
// maybe expose for augmenting, maybe not?
interface AddEntryDefaultOptions {
  userId: string;
  cartId: string;
}

/**
 * Common options for adding an entry.
 * Intended for extending / augmenting.
 */
export interface AddEntryCommonOptions extends CommonOptions {
  productCode: string;
  quantity?: number;
}

export interface AddEntryActiveCartFacadeOptions
  extends AddEntryCommonOptions {}
export interface AddEntriesActiveCartFacadeOptions {
  // TODO:#xxx - items? products?
  entries: AddEntryActiveCartFacadeOptions[];
}

export interface AddEntryMultiCartFacadeOptions
  extends AddEntryCommonOptions,
    AddEntryDefaultOptions {}

export interface AddEntryMultiCartFacadeEntry extends AddEntryCommonOptions {}
export interface AddEntriesMultiCartFacadeOptions
  extends AddEntryDefaultOptions {
  // TODO:#xxx - items? products?
  entries: AddEntryMultiCartFacadeEntry[];
}

export interface AddEntryActionOptions
  extends AddEntryCommonOptions,
    AddEntryDefaultOptions {}

export interface AddEntryConnectorOptions
  extends AddEntryCommonOptions,
    AddEntryDefaultOptions {}

export interface AddEntryAdapterOptions
  extends AddEntryCommonOptions,
    AddEntryDefaultOptions {}

interface UpdateEntryDefaultOptions {
  userId: string;
  cartId: string;
}
export interface UpdateEntryCommonOptions {
  entryNumber: number;
  quantity?: number;
}

export interface UpdateEntryActiveCartFacadeOptions
  extends UpdateEntryCommonOptions {}

export interface UpdateEntryMultiCartFacadeOptions
  extends UpdateEntryCommonOptions,
    UpdateEntryDefaultOptions {}

export interface UpdateEntryActionOptions
  extends UpdateEntryCommonOptions,
    UpdateEntryDefaultOptions {}

export interface UpdateEntryConnectorOptions
  extends UpdateEntryCommonOptions,
    UpdateEntryDefaultOptions {}

export interface UpdateEntryAdapterOptions
  extends UpdateEntryCommonOptions,
    UpdateEntryDefaultOptions {}

interface RemoveEntryDefaultOptions {
  userId: string;
  cartId: string;
}
export interface RemoveEntryCommonOptions {
  entryNumber: number;
}
export interface RemoveEntryActiveCartFacadeOptions
  extends RemoveEntryCommonOptions {}

export interface RemoveEntryMultiCartFacadeOptions
  extends RemoveEntryCommonOptions,
    RemoveEntryDefaultOptions {}

export interface RemoveEntryActionOptions
  extends RemoveEntryCommonOptions,
    RemoveEntryDefaultOptions {}

export interface RemoveEntryConnectorOptions
  extends RemoveEntryCommonOptions,
    RemoveEntryDefaultOptions {}

export interface RemoveEntryAdapterOptions
  extends RemoveEntryCommonOptions,
    RemoveEntryDefaultOptions {}
