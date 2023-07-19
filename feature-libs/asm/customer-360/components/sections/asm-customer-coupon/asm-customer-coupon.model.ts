/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Customer360Coupon } from '@spartacus/asm/customer-360/root';

export interface CouponEntry extends Customer360Coupon {
  applied: boolean;
  code: string;
  name?: string;
}
