/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import type { OccEndpoint as CoreOccEndpoint } from '@spartacus/core';

export interface DocumentFlowOccEndpoints {
  /**
   * Get order subsequent documents
   */
  subsequentDocuments?: string | CoreOccEndpoint;

  /**
   * Get order subsequent document entries
   */
  subsequentDocumentsEntries?: string | CoreOccEndpoint;
}

declare module '@spartacus/core' {
  interface OccEndpoints extends DocumentFlowOccEndpoints {}
}
