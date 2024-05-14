/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Identifiers of cpq-quote.
 */
import '@spartacus/cart/base/root';
import { cpqDiscounts } from './cpqDiscounts.model';

declare module '@spartacus/cart/base/root' {
  interface OrderEntry {
    cpqDiscounts?: cpqDiscounts[];
  }
}
