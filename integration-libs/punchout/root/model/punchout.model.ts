/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export const PUNCHOUT_SESSION_KEY = 'sid';
export const PUNCHOUT_ERROR_PAGE_URL = '/punchout/cxml/error';
export const PUNCHOUT_SESSION_ID = 'punchoutSessionId';
export const PUNCHOUT_SESSION_PAGE_URL = '/punchout/cxml/session';

export enum PunchOutLevel {
  STORE = 'store',
  PRODUCT = 'product',
  AISLE = 'aisle',
  SHAELF = 'shelf',
}

export enum PunchOutOperation {
  CREATE = 'create',
  EDIT = 'edit',
  INSPECT = 'inspect',
  SOURCE = 'source',
}

export const PUNCHOUT_STORAGE_KEY = 'punchout';

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
}
