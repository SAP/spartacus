/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export enum PunchOutLevel {
  STORE = 'STORE',
  PRODUCT = 'PRODUCT',
  AISLE = 'AISLE',
  SHELF = 'SHELF',
}

export enum PunchOutOperation {
  CREATE = 'CREATE',
  EDIT = 'EDIT',
  INSPECT = 'INSPECT',
}

export interface PunchoutSessionInput {
  punchoutSessionId: string;
  isPageRefresh?: boolean;
}

export interface PunchoutSession {
  customerId: string;
  cartId: string;
  punchOutLevel: PunchOutLevel;
  punchOutOperation: PunchOutOperation;
  selectedItem: string;
  token?: {
    accessToken: string;
    tokenType: string;
  };
}

export interface PunchoutRequisition {
  browseFormPostUrl: string;
  orderAsCXML: string;
}

export interface PunchoutState {
  punchoutSession?: PunchoutSession;
  punchoutSessionId?: string;
  cancelRequisition?: boolean;
  closePunchoutSession?: boolean;
  punchoutInitialRequisition?: PunchoutRequisition;
}
