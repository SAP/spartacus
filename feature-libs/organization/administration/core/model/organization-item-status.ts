/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export enum LoadStatus {
  SUCCESS,
  ERROR,
}

export interface OrganizationItemStatus<T> {
  status: LoadStatus | null;
  item: T | undefined;
}
