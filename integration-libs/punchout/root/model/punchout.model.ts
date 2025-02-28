/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export const PUNCHOUT_SESSION_KEY = 'sid';

export interface PunchoutSession {
  customerId: string;
  cartId: string;
  punchOutLevel: string;
  punchOutOperation: string;
  selectedItem: string;
  token: {
    accessToken: string;
    tokenType: string;
  };
}

export interface PunchoutRequisition {
  browseFormPostUrl: string;
  orderAsCXML: string;
}
