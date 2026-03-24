/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
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
  is3DSRedirect?: boolean;
  opf3DSRedirectReturnPath?: string;
}
