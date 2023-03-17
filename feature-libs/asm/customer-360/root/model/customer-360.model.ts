/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { UrlCommand, User } from '@spartacus/core';

export interface Customer360Review {
  productName: string;
  productCode: string;
  createdAt: string;
  updatedAt: string;
  rating: string;
  reviewStatus: string;
  reviewText: string;
}

export enum Customer360Type {
  REVIEW_LIST = 'c360ReviewList',
  STORE_LOCATION = 'c360StoreLocation',
  PRODUCT_INTEREST_LIST = 'c360CustomerProductInterestList',
}

export interface Customer360ReviewList {
  type: Customer360Type.REVIEW_LIST;
  reviews: Array<Customer360Review>;
}

export interface Customer360StoreLocation {
  type: Customer360Type.STORE_LOCATION;
  address: string;
}

export interface Customer360ProductInterestList {
  type: Customer360Type.PRODUCT_INTEREST_LIST;
  customerProductInterests: Array<{
    product: {
      code: string;
    };
  }>;
}

export interface Customer360Params {
  userId: string;
}

export interface AdditionalRequestParameters {
  timeout?: number;
}

export interface Customer360Query {
  type?: Customer360Type | string;
  additionalRequestParameters?: AdditionalRequestParameters;
}

export interface Customer360Request {
  queries: Array<Customer360Query>;
  options: Customer360Params;
}

export type Customer360Data =
  | Customer360ProductInterestList
  | Customer360ReviewList
  | Customer360StoreLocation;

export interface Customer360Response {
  value: Array<Customer360Data>;
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
