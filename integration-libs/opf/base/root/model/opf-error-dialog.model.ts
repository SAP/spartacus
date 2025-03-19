/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export type OpfErrorDialogOptions = {
  confirmString?: string;
  confirmKey?: string;
  confirmReplacements?: any;
  messageString?: string;
  messageKey?: string;
  messageReplacements?: any;
};

export const defaultOpfErrorDialogOptions: OpfErrorDialogOptions = {
  messageKey: 'opfPayment.errors.proceedPayment',
  confirmKey: 'common.continue',
};
