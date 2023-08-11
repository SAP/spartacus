/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Customer360Promotion } from '@spartacus/asm/customer-360/root';

export interface PromotionEntry extends Customer360Promotion {
  applied: boolean;
  code?: string;
  name?: string;
  message?: string;
}
