/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export type ErrorDialogOptions = {
  confirmString?: string;
  confirmKey?: string;
  confirmReplacements?: any;
  messageString?: string;
  messageKey?: string;
  messageReplacements?: any;
};

export const defaultErrorDialogOptions: ErrorDialogOptions = {
  messageKey: 'opfPayment.errors.proceedPayment',
  confirmKey: 'common.continue',
};
