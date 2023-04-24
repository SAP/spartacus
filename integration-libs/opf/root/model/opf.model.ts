/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Address } from '@spartacus/core';

export interface OpfUi {
  termsAndConditionsChecked?: boolean;
  selectedPaymentOptionId?: number;
  billingAddress?: Address;
}
