/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  DeliveryMode,
  DeliveryOrderEntryGroup,
  OrderEntry,
  PaymentDetails,
  PaymentType,
  PickupOrderEntryGroup,
  PromotionResult,
  Voucher,
} from '@spartacus/cart/base/root';
import {
  Address,
  CostCenter,
  PaginationModel,
  Price,
  Principal,
  SortModel,
} from '@spartacus/core';

export interface ReplenishmentOrder {
  active?: boolean;
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
  expirationTime?: string;
  firstDate?: string;
  guid?: string;
  name?: string;
  net?: boolean;
  orderDiscounts?: Price;
  paymentInfo?: PaymentDetails;
  paymentStatus?: string;
  paymentType?: PaymentType;
  pickupItemsQuantity?: number;
  pickupOrderGroups?: PickupOrderEntryGroup[];
  potentialOrderPromotions?: PromotionResult[];
  potentialProductPromotions?: PromotionResult[];
  productDiscounts?: Price;
  purchaseOrderNumber?: string;
  replenishmentOrderCode?: string;
  saveTime?: string;
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
  trigger?: Trigger;
  user?: Principal;
}

export interface ReplenishmentOrderList {
  replenishmentOrders?: ReplenishmentOrder[];
  pagination?: PaginationModel;
  sorts?: SortModel[];
}

export interface Trigger {
  activationTime?: string;
  displayTimeTable?: string;
}
