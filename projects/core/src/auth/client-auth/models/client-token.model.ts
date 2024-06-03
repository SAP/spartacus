/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ClientToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}
