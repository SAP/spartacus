/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Address, CxEvent, PaymentDetails } from '@spartacus/core';

/**
 * Emit this event to force checkout details reload
 */
export class CheckoutQueryReloadEvent extends CxEvent {
  /**
   * Event's type
   */
  static readonly type = 'CheckoutQueryReloadEvent';
}

/**
 * Emit this event to force checkout details reset
 */
export class CheckoutQueryResetEvent extends CxEvent {
  /**
   * Event's type
   */
  static readonly type = 'CheckoutQueryResetEvent';
}

/**
 * An abstract event for all the checkout events.
 */
export abstract class CheckoutEvent extends CxEvent {
  userId?: string;
  /**
   * Usually set via `getCartIdByUserId()` util method,
   * It is an abstraction over the different properties
   * used for anonymous and logged-in users' carts:
   * - `code` for logged-in users
   * - `guid` for anonymous users
   */
  cartId?: string;
  /**
   * All carts have the `code` property assigned to them,
   * regardless of whether they are anonymous or logged-in.
   * In case of logged-in users, the `cartCode` and `cartId` are the same.
   */
  cartCode?: string;
}

/**
 * An abstract event for all the delivery address related events.
 */
export abstract class CheckoutDeliveryAddressEvent extends CheckoutEvent {}

/**
 * Fired when the delivery address is create cleared.
 */
export class CheckoutDeliveryAddressCreatedEvent extends CheckoutDeliveryAddressEvent {
  /**
   * Event's type
   */
  static readonly type = 'CheckoutDeliveryAddressCreatedEvent';
  /**
   * The address.
   */
  address: Address;
}

/**
 * Fired when the user sets a delivery address during checkout.
 */
export class CheckoutDeliveryAddressSetEvent extends CheckoutDeliveryAddressEvent {
  /**
   * Event's type
   */
  static readonly type = 'CheckoutDeliveryAddressSetEvent';
  /**
   * The address.
   */
  address: Address;
}

/**
 * Fired when the delivery address has to be cleared.
 */
export class CheckoutDeliveryAddressClearedEvent extends CheckoutDeliveryAddressEvent {
  /**
   * Event's type
   */
  static readonly type = 'CheckoutDeliveryAddressClearedEvent';
}

/**
 * An abstract event for all the delivery mode related events.
 */
export abstract class CheckoutDeliveryModeEvent extends CheckoutEvent {}

/**
 * Fired when the delivery mode was set.
 */
export class CheckoutDeliveryModeSetEvent extends CheckoutDeliveryModeEvent {
  /**
   * Event's type
   */
  static readonly type = 'CheckoutDeliveryModeSetEvent';
  /**
   * Delivery mode code.
   */
  deliveryModeCode: string;
}

/**
 * Fired when the delivery mode has been cleared.
 */
export class CheckoutDeliveryModeClearedEvent extends CheckoutDeliveryModeEvent {
  /**
   * Event's type
   */
  static readonly type = 'CheckoutDeliveryModeClearedEvent';
}

/**
 * Fired when the delivery mode has an error when trying to be cleared.
 */
export class CheckoutDeliveryModeClearedErrorEvent extends CheckoutDeliveryModeEvent {
  /**
   * Event's type
   */
  static readonly type = 'CheckoutDeliveryModeClearedErrorEvent';
}

/**
 * Emit this event to force delivery modes reload
 */
export class CheckoutSupportedDeliveryModesQueryReloadEvent extends CheckoutDeliveryModeEvent {
  /**
   * Event's type
   */
  static readonly type = 'CheckoutSupportedDeliveryModesQueryReloadEvent';
}

/**
 * Emit this event to force delivery modes reset
 */
export class CheckoutSupportedDeliveryModesQueryResetEvent extends CheckoutDeliveryModeEvent {
  /**
   * Event's type
   */
  static readonly type = 'CheckoutSupportedDeliveryModesQueryResetEvent';
}

/**
 * An abstract event for all the payment details related events.
 */
export abstract class CheckoutPaymentDetailsEvent extends CheckoutEvent {}

/**
 * Fired when the payment details have been created.
 */
export class CheckoutPaymentDetailsCreatedEvent extends CheckoutPaymentDetailsEvent {
  /**
   * Event's type
   */
  static readonly type = 'CheckoutPaymentDetailsCreatedEvent';
  /**
   * Payment details
   */
  paymentDetails: PaymentDetails;
}

/**
 * Fired when the payment details have been set.
 */
export class CheckoutPaymentDetailsSetEvent extends CheckoutPaymentDetailsEvent {
  /**
   * Event's type
   */
  static readonly type = 'CheckoutPaymentDetailsSetEvent';
  /**
   * Payment details id
   */
  paymentDetailsId: string;
}

/**
 * Emit this event to force payment card types reload
 */
export class CheckoutPaymentCardTypesQueryReloadEvent extends CheckoutPaymentDetailsEvent {
  /**
   * Event's type
   */
  static readonly type = 'CheckoutPaymentCardTypesQueryReloadEvent';
}

/**
 * Emit this event to force payment card types reset
 */
export class CheckoutPaymentCardTypesQueryResetEvent extends CheckoutPaymentDetailsEvent {
  /**
   * Event's type
   */
  static readonly type = 'CheckoutPaymentCardTypesQueryResetEvent';
}
