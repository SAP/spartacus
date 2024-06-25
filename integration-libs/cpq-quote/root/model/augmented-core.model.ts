/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import '@spartacus/cart/base/root';
import { CpqDiscounts } from './cpqDiscounts.model';

declare module '@spartacus/cart/base/root' {
  interface OrderEntry {
    cpqDiscounts?: CpqDiscounts[];
  }
}
