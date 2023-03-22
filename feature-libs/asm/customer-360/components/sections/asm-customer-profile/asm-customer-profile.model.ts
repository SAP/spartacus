/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { PaymentDetails } from '@spartacus/cart/base/root';
import { Address } from '@spartacus/core';
export interface CustomerProfileData {
  billingAddress?: Address;
  deliveryAddress?: Address;
  phone1?: string;
  phone2?: string;
  paymentInfoList?: PaymentDetails[];
}
