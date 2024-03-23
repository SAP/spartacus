/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import '@spartacus/cart/base/root';
import { arrivalSlots } from './schedule-line.model';

declare module '@spartacus/cart/base/root' {
  interface OrderEntry {
    arrivalSlots?: arrivalSlots[];
  }
}
