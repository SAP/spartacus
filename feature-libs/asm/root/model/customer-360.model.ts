/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { UrlCommand, User } from '@spartacus/core';

export interface AsmCustomer360Review {
  productName: string;
  productCode: string;
  createdAt: string;
  updatedAt: string;
  rating: string;
  reviewStatus: string;
  reviewText: string;
}

export enum AsmCustomer360Type {
  REVIEW_LIST = 'c360ReviewList',
  STORE_LOCATION = 'c360StoreLocation',
  PRODUCT_INTEREST_LIST = 'c360CustomerProductInterestList',
}

export interface AsmCustomer360ReviewList {
  type: AsmCustomer360Type.REVIEW_LIST;
  reviews: Array<AsmCustomer360Review>;
}

export interface AsmCustomer360StoreLocation {
  type: AsmCustomer360Type.STORE_LOCATION;
  address: string;
}

export interface AsmCustomer360ProductInterestList {
  type: AsmCustomer360Type.PRODUCT_INTEREST_LIST;
  customerProductInterests: Array<{
    product: {
      code: string;
    };
  }>;
}

export interface AsmCustomer360Params {
  userId: string;
}

export interface AdditionalRequestParameters {
  timeout?: number;
}

export interface AsmCustomer360Query {
  customer360Type?: AsmCustomer360Type | string;
  additionalRequestParameters?: AdditionalRequestParameters;
}

export interface AsmCustomer360Request {
  queries: Array<AsmCustomer360Query>;
  options?: AsmCustomer360Params;
}

export type AsmCustomer360Data =
  | AsmCustomer360ProductInterestList
  | AsmCustomer360ReviewList
  | AsmCustomer360StoreLocation;

export interface AsmCustomer360Response {
  value: Array<AsmCustomer360Data>;
}

export enum AsmDialogActionType {
  NAVIGATE = 'NAVIGATE',
}

export interface AsmDialogActionEvent {
  selectedUser: User;
  actionType: AsmDialogActionType;
  route?: UrlCommand;
}

import '@spartacus/storefront';

declare module '@spartacus/storefront' {
  const enum LAUNCH_CALLER {
    ASM_CUSTOMER_360 = 'ASM_CUSTOMER_360',
  }
}
