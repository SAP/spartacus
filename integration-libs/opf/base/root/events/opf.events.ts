/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CxEvent } from '@spartacus/core';

/**
 * Emit this event to force payment card types reset
 */
export class OpfUiClearEvent extends CxEvent {
  /**
   * Emit type
   */
  static readonly type = 'CheckoutOpfUiClearEvent';
}

/**
 * Emit this event to force processing payment flag reset
 */
export class OpfProcessingPaymentClearEvent extends CxEvent {
  /**
   * Emit type
   */
  static readonly type = 'CheckoutOpfUiClearEvent';
}
