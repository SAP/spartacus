/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CheckoutEvent } from '@spartacus/checkout/base/root';
import { ServiceDateTime } from '../model/checkout-service-details.model';

/**
 * An abstract event for all the service details related events.
 */
export abstract class CheckoutServiceDetailsEvent extends CheckoutEvent {}

/**
 * Fired when the service details has been set
 */
export class CheckoutServiceDetailsSetEvent extends CheckoutServiceDetailsEvent {
  /**
   * Event's type
   */
  static readonly type = 'CheckoutServiceDetailsSetEvent';

  /**
   * scheduled time and date
   */
  scheduledAt?: ServiceDateTime;
}
