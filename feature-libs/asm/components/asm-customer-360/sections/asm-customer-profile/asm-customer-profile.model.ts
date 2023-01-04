/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Address, PaymentDetails } from '@spartacus/core';

export interface CustomerProfileData {
  billingAddress?: Address;
  deliveryAddress?: Address;
  phone1?: String;
  phone2?: String;
  paymentInfoList?: PaymentDetails[];
}
