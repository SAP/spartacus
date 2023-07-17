/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export interface pagination {
  currentPage: number;
  pageSize: number;
  sort: string;
  totalPages: number;
}
