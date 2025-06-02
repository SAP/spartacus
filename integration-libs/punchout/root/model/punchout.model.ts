/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export const PUNCHOUT_SESSION_KEY = 'sid';
export const PUNCHOUT_SESSION_ID = 'punchoutSessionId';
export const PUNCHOUT_SESSION_PAGE_URL = '/punchout/cxml/session';
export const PUNCHOUT_REQUISITION_PAGE_URL = '/punchout/cxml/requisition';
export const PUNCHOUT_INSPECT_PAGE_URL = '/punchout/cxml/inspect';
export const PUNCHOUT_STORAGE_KEY = 'punchout';
export const PUNCHOUT_OCC_API_URL_SEGMENT = 'punchout/sessions';
export const PUNCHOUT_SESSION_ID_HEADER_KEY = 'punchoutsid';

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

export type PunchoutNavigationGuardConfig = {
  [key in PunchOutOperation]: {
    allowedUrls?: string[];
    allowedCxRoutes?: string[];
    redirectPage: string;
  };
};
