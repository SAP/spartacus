/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import '@spartacus/cart/base/root';
import { ArrivalSlot, ArrivalSlots } from './estimated-delivery-date.model';

declare module '@spartacus/cart/base/root' {
  interface OrderEntry {
    arrivalSlots?: ArrivalSlots[];
  }
}

declare module '@spartacus/order/root' {
  interface Consignment {
    arrivalSlot?: ArrivalSlot;
  }
}
