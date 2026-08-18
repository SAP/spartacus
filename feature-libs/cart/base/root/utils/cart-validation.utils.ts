/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CartModification, CartValidationStatusCode } from '../models/cart.model';

/**
 * Minimum / maximum order quantity parsed out of a cart modification's
 * free-text `statusMessage` (e.g. for `below_min_quantity` / `above_max_quantity`).
 */
export interface CartModificationQuantityInfo {
  min?: number;
  max?: number;
}

/**
 * Parses `Min=<n>` / `Max=<n>` tokens out of a free-text `statusMessage` such as
 * `"The minimum required quantity for product code X has not been met. Min=5, Actual=1."`.
 *
 * The tokens are optional and matched independently, so a message that only carries
 * one of them yields only that value. When a token is absent (or the message is
 * undefined) the corresponding value is left `undefined`.
 */
export function parseCartModificationQuantityInfo(
  statusMessage: string | undefined
): CartModificationQuantityInfo {
  const min = statusMessage?.match(/Min=(\d+)/i)?.[1];
  const max = statusMessage?.match(/Max=(\d+)/i)?.[1];
  return {
    min: min != null ? Number(min) : undefined,
    max: max != null ? Number(max) : undefined,
  };
}

/**
 * Determines whether a cart modification refers to the given product `code`.
 *
 * A modification matches when its `entry` references the product code. When the
 * backend does not provide an `entry` (e.g. for `below_min_quantity`) and
 * `displayBackendMessages` is enabled, it falls back to matching the product code
 * embedded in the free-text `statusMessage`.
 */
export function cartModificationMatchesCode(
  modification: CartModification,
  code: string | undefined,
  displayBackendMessages: boolean
): boolean {
  if (modification.entry?.product?.code === code) {
    return true;
  }
  return (
    displayBackendMessages &&
    !modification.entry &&
    code != null &&
    code.length > 0 &&
    !!modification.statusMessage?.includes(code)
  );
}

/**
 * Whether the modification is a min/max order quantity violation
 * (`below_min_quantity` / `exceed_max_quantity`). For these the raw
 * `statusMessage` alert is suppressed, since the limit is already conveyed by
 * the per-item quantity hint and the highlighted row.
 */
export function isQuantityLimitViolation(
  modification: CartModification
): boolean {
  return (
    modification.statusCode === CartValidationStatusCode.BELOW_MIN_QUANTITY ||
    modification.statusCode === CartValidationStatusCode.ABOVE_MAX_QUANTITY
  );
}
