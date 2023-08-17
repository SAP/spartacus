/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DeliveryModePreferences } from '../config/checkout-config';
import { CheckoutStep } from './checkout-step.model';

export interface CheckoutFlow {
  /**
   * Set key/identifier for the checkout flow.
   */
  identifier: string;
  /**
   * Set checkout steps as ordered array of pages.
   */
  steps?: Array<CheckoutStep>;
  /**
   * Allow for express checkout when default shipping method and payment method are available.
   */
  express?: boolean;
  /**
   * Default delivery mode for i.a. express checkout. Set preferences in order with general preferences (eg. DeliveryModePreferences.LEAST_EXPENSIVE) or specific delivery codes.
   */
  defaultDeliveryMode?: Array<DeliveryModePreferences | string>;
  /**
   * Allow for guest checkout.
   */
  guest?: boolean;
  /**
   * Use delivery address saved in cart for pre-filling delivery address form.
   */
  guestUseSavedAddress?: boolean;
}
