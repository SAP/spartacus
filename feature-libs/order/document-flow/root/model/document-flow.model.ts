/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export interface OrderSubsequentDocument {
  sapDocumentId?: string;
  sapDocumentCategory?: string;
  sapDocumentEntryIdColumnName?: string;
  sapSubsequentDocuments?: OrderSubsequentDocument[];
  sapCreatedAt?: Date;
  sapStatus?: string;
}

export interface OrderSubsequentDocumentEntry {
  sapSubsequentDocumentEntryNumber?: string;
  sapOrderEntryNumber?: string;
  sapCreatedAt?: Date;
  sapStatus?: string;
}
