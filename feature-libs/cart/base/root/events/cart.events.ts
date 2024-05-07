/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CxEvent } from '@spartacus/core';
import { OrderEntry } from '../models/cart.model';

/**
 * Base cart event. Most cart events should have these properties.
 */
export abstract class CartEvent extends CxEvent {
  /**
   * Usually set via `getCartIdByUserId()` util method,
   * It is an abstraction over the different properties
   * used for anonymous and logged-in users' carts:
   * - `code` for logged-in users
   * - `guid` for anonymous users
   */
  cartId: string;
  /**
   * All carts have the `code` property assigned to them,
   * regardless of whether they are anonymous or logged-in.
   * In case of logged-in users, the `cartCode` and `cartId` are the same.
   */
  cartCode: string;
  /**
   * User ID.
   */
  userId: string;
}

export class CreateCartEvent extends CartEvent {
  /**
   * Event's type
   */
  static readonly type = 'CreateCartEvent';
}

export class CreateCartSuccessEvent extends CartEvent {
  /**
   * Event's type
   */
  static readonly type = 'CreateCartSuccessEvent';
}

export class CreateCartFailEvent extends CartEvent {
  /**
   * Event's type
   */
  static readonly type = 'CreateCartFailEvent';
  error: any;
}

export class CartAddEntryEvent extends CartEvent {
  /**
   * Event's type
   */
  static readonly type = 'CartAddEntryEvent';
  productCode: string;
  quantity: number;
}

export class CartAddEntrySuccessEvent extends CartEvent {
  /**
   * Event's type
   */
  static readonly type = 'CartAddEntrySuccessEvent';
  productCode: string;
  quantity: number;
  entry?: OrderEntry;
  quantityAdded?: number;
  deliveryModeChanged?: boolean;
}

export class CartAddEntryFailEvent extends CartEvent {
  /**
   * Event's type
   */
  static readonly type = 'CartAddEntryFailEvent';
  productCode: string;
  quantity: number;
  error?: unknown;
}

export class CartRemoveEntryFailEvent extends CartEvent {
  /**
   * Event's type
   */
  static readonly type = 'CartRemoveEntryFailEvent';
  entry: OrderEntry;
}

export class CartRemoveEntrySuccessEvent extends CartEvent {
  /**
   * Event's type
   */
  static readonly type = 'CartRemoveEntrySuccessEvent';
  entry: OrderEntry;
}

export class CartUpdateEntrySuccessEvent extends CartEvent {
  /**
   * Event's type
   */
  static readonly type = 'CartUpdateEntrySuccessEvent';
  quantity: number;
  entry: OrderEntry;
}

export class CartUpdateEntryFailEvent extends CartEvent {
  /**
   * Event's type
   */
  static readonly type = 'CartUpdateEntryFailEvent';
  quantity: number;
  entry: OrderEntry;
}

export class CartUiEventAddToCart extends CxEvent {
  /**
   * Event's type
   */
  static readonly type = 'CartUiEventAddToCart';
  productCode: string;
  quantity: number;
  numberOfEntriesBeforeAdd: number;
  pickupStoreName?: string;
}

/**
 * Fired when the cart has been successfully merged.
 */
export class MergeCartSuccessEvent extends CartEvent {
  /**
   * Event's type
   */
  static readonly type = 'MergeCartSuccessEvent';
  /**
   * MergeCart actions triggers CreateCart which requires this parameter, so that's why it is required.
   */
  tempCartId: string;
  /**
   * Previous cart id which was merged with new/user cart.
   * Needed to know which obsolete entity should be removed.
   */
  oldCartId?: string;
  /** Extra data */
  extraData?: { active?: boolean };
}

/**
 * Triggers the loading of the cart.
 */
export class LoadCartEvent extends CartEvent {
  /**
   * Event's type
   */
  static readonly type = 'LoadCartEvent';
}

/** Removes the cart. */
export class RemoveCartEvent extends CartEvent {
  /**
   * Event's type
   */
  static readonly type = 'RemoveCartEvent';
}

/**
 * Fired when the cart has been deleted.
 */
export class DeleteCartEvent extends CartEvent {
  /**
   * Event's type
   */
  static readonly type = 'DeleteCartEvent';
}

export class DeleteCartSuccessEvent extends CartEvent {
  /**
   * Event's type
   */
  static readonly type = 'DeleteCartSuccessEvent';
}

export class DeleteCartFailEvent extends CartEvent {
  /**
   * Event's type
   */
  static readonly type = 'DeleteCartFailEvent';
}

export class AddCartVoucherEvent extends CartEvent {
  /**
   * Event's type
   */
  static readonly type: string = 'AddCartVoucherEvent';
  voucherId: string;
}

export class AddCartVoucherSuccessEvent extends AddCartVoucherEvent {
  /**
   * Event's type
   */
  static readonly type = 'AddCartVoucherSuccessEvent';
}

export class AddCartVoucherFailEvent extends AddCartVoucherEvent {
  /**
   * Event's type
   */
  static readonly type = 'AddCartVoucherFailEvent';
  error: unknown;
}

export class RemoveCartVoucherEvent extends CartEvent {
  /**
   * Event's type
   */
  static readonly type: string = 'RemoveCartVoucherEvent';
  voucherId: string;
}

export class RemoveCartVoucherSuccessEvent extends RemoveCartVoucherEvent {
  /**
   * Event's type
   */
  static readonly type: string = 'RemoveCartVoucherSuccessEvent';
}

export class RemoveCartVoucherFailEvent extends RemoveCartVoucherEvent {
  /**
   * Event's type
   */
  static readonly type = 'RemoveCartVoucherFailEvent';
  error: unknown;
}
