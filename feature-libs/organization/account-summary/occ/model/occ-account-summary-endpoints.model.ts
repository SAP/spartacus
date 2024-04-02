/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccEndpoint } from '@spartacus/core';

export interface AccountSummaryOccEndpoints {
  /**
   * Get Account summary header details
   *
   * @member {string} [accountSummary]
   */

  accountSummary?: string | OccEndpoint;

  /**
   * Get Account summary documents
   *
   * @member {string} [accountSummaryDocument]
   */

  accountSummaryDocument?: string | OccEndpoint;

  /**
   * Get Account summary document attachment
   *
   * @member {string} [accountSummaryDocumentAttachment]
   */

  accountSummaryDocumentAttachment?: string | OccEndpoint;
}

declare module '@spartacus/core' {
  interface OccEndpoints extends AccountSummaryOccEndpoints {}
}
