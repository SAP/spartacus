/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Context data passed to saved cards toggle and payment method components via outlet.
 */
export interface OpfSavedCardsToggleContext {
  savedPaymentHeading?: string | null;
  savedCardsHeading?: string | null;
  newPaymentHeadingKey?: string;
  selectedPaymentId?: number;
  savedCardsId?: number;
  hasSavedCards?: boolean;
  disabled?: boolean | null;
  savedCardsSelected?: () => void;
  showSavedCardsList?: boolean;
}

/**
 * Context data passed to new payments heading component via outlet.
 * Allows customization of the heading text displayed above the new payment method form.
 */
export interface OpfNewPaymentsHeadingContext {
  newPaymentHeading?: string | null;
  hasSavedCards?: boolean;
}
