/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Customer360Review } from '@spartacus/asm/customer-360/root';

export interface ReviewEntry extends Customer360Review {
  item?: string;
  dateAndStatus?: string;
}
