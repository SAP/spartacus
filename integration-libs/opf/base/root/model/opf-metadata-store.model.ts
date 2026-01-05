/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export interface OpfMetadataModel {
  termsAndConditionsChecked: boolean;
  selectedPaymentOptionId: number | undefined;
  defaultSelectedPaymentOptionId?: number;
  isPaymentInProgress: boolean;
  opfPaymentSessionId: string | undefined;
  isTermsAndConditionsAlertClosed: boolean;
}
