/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsmCustomer360Review } from '@spartacus/asm/customer-360/root';

export interface ReviewEntry extends AsmCustomer360Review {
  item?: string;
  dateAndStatus?: string;
}
