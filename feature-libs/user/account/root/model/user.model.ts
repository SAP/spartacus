/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export interface User {
  displayUid?: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  uid?: string;
  customerId?: string;
  title?: string;
}

export interface LoginForm {
  purpose: string;
  loginId: string;
  password: string;
}

export interface VerificationToken {
  expiresIn: string;
  tokenId: string;
}

