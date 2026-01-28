/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccEndpoint } from '@spartacus/core';

export interface DocumentFlowOccEndpoints {
  /**
   * Get order subsequent documents
   */
  subsequentDocuments?: string | OccEndpoint;

  /**
   * Get order subsequent document entries
   */
  subsequentDocumentsEntries?: string | OccEndpoint;
}

declare module '@spartacus/core' {
  interface OccEndpoints extends DocumentFlowOccEndpoints {}
}
