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
  disabled?: boolean | null;
  savedCardsSelected?: () => void;
  showSavedCardsList?: boolean;
}
