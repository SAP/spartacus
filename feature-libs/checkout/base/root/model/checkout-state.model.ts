/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DeliveryMode } from '@spartacus/cart/base/root';
import { Address, PaymentDetails } from '@spartacus/core';

export interface CheckoutState {
  deliveryAddress?: Address;
  deliveryMode?: DeliveryMode;
  paymentInfo?: PaymentDetails;
}
