/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Address } from '@spartacus/core';
import { PaymentDetails } from '@spartacus/cart/base/root';
export interface CustomerProfileData {
  billingAddress?: Address;
  deliveryAddress?: Address;
  phone1?: string;
  phone2?: string;
  paymentInfoList?: PaymentDetails[];
}
