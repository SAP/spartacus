/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SapOrderSubsequentDocument {
  sapDocumentId?: string;
  sapDocumentCategory?: string;
  sapDocumentEntryIdColumnName?: string;
  sapSubsequentDocuments?: SapOrderSubsequentDocument[];
  sapCreatedAt?: Date;
  sapStatus?: string;
}

export interface SapOrderSubsequentDocumentEntry {
  sapSubsequentDocumentEntryNumber?: string
  sapOrderEntryNumber?: string
  sapCreatedAt?: Date
  sapStatus?: string
}
