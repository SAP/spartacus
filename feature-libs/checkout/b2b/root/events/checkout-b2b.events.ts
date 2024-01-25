/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CheckoutEvent } from '@spartacus/checkout/base/root';

/**
 * An abstract event for all the cost center related events.
 */
export abstract class CheckoutCostCenterEvent extends CheckoutEvent {}

/**
 * Fired when the cost center has been set.
 */
export class CheckoutCostCenterSetEvent extends CheckoutCostCenterEvent {
  /**
   * Event's type
   */
  static readonly type = 'CheckoutCostCenterSetEvent';

  /**
   * Cost center code
   */
  code: string;
}

/**
 * An abstract event for all the payment type related events.
 */
export abstract class CheckoutPaymentTypeEvent extends CheckoutEvent {}

/**
 * Emit this event to force payment types reload
 */
export class CheckoutPaymentTypesQueryReloadEvent extends CheckoutPaymentTypeEvent {
  /**
   * Event's type
   */
  static readonly type = 'CheckoutPaymentTypesQueryReloadEvent';
}

/**
 * Emit this event to force payment types reset
 */
export class CheckoutPaymentTypesQueryResetEvent extends CheckoutPaymentTypeEvent {
  /**
   * Event's type
   */
  static readonly type = 'CheckoutPaymentTypesQueryResetEvent';
}

/**
 * Fired when the payment type has been set
 */
export class CheckoutPaymentTypeSetEvent extends CheckoutPaymentTypeEvent {
  /**
   * Event's type
   */
  static readonly type = 'CheckoutPaymentTypeSetEvent';

  /**
   * Payment type code
   */
  paymentTypeCode: string;

  /**
   * Purchase order number
   */
  purchaseOrderNumber?: string;
}
