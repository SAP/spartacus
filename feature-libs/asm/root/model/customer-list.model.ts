/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Member {
  name?: string;
  uid?: string;
}

export interface UserGroup {
  members?: Array<Member>;
  membersCount?: number;
  name?: string;
  subGroups?: Array<UserGroup>;
  uid?: string;
}

export interface CustomerListsPage {
  currentPage?: number;
  numberOfPages?: number;
  pageSize?: number;
  totalNumber?: number;
  userGroups?: Array<UserGroup>;
}

export enum CustomerListColumnActionType {
  START_SESSION = 'START_SESSION',
  ORDER_HISTORY = 'ORDER_HISTORY',
  ACTIVE_CART = 'ACTIVE_CART',
}
