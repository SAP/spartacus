/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { PaginationModel, SortModel, User } from '@spartacus/core';

export interface CustomerSearchPage {
  entries: User[];
  pagination?: PaginationModel;
  sorts?: SortModel[];
}

export interface CustomerSearchOptions {
  query?: string;
  orderId?: string;
  pageSize?: number;
  customerListId?: string;
  currentPage?: number;
  page?: number;
  sort?: string;
}

export interface AsmUi {
  status?: number;
  collapsed?: boolean;
}

export const CLOSE_DIALOG_REASON = {
  FORBIDDEN: 'forbidden',
};

export interface AsmDeepLinkParameters {
  customerId?: string;
  orderId?: string;
  ticketId?: string;
  cartId?: string;
  cartType?: string;
}

export interface AsmSessionCreationOptions {
  eventType: string;
}
