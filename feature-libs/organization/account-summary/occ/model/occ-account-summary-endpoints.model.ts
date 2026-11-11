/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import type { OccEndpoint as CoreOccEndpoint } from '@spartacus/core';

export interface AccountSummaryOccEndpoints {
  /**
   * Get Account summary header details
   *
   * @member {string} [accountSummary]
   */

  accountSummary?: string | CoreOccEndpoint;

  /**
   * Get Account summary documents
   *
   * @member {string} [accountSummaryDocument]
   */

  accountSummaryDocument?: string | CoreOccEndpoint;

  /**
   * Get Account summary document attachment
   *
   * @member {string} [accountSummaryDocumentAttachment]
   */

  accountSummaryDocumentAttachment?: string | CoreOccEndpoint;
}

declare module '@spartacus/core' {
  interface OccEndpoints extends AccountSummaryOccEndpoints {}
}
