/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export interface VerificationTokenCreation {
  purpose: string;
  loginId: string;
  password: string;
}

export interface VerificationToken {
  expiresIn: string;
  tokenId: string;
}

export enum VERIFICATION_TOKEN_DIALOG_ACTION {
  OK = 'OK',
}
