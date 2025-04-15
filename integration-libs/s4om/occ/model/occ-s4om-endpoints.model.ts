/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccEndpoint } from '@spartacus/core';

export interface S4omOccEndpoints {
  /**
   * Get order attachments
   */
  orderAttachments?: string | OccEndpoint;
  /**
   * Download order attachment blob
   */
  downloadOrderAttachment?: string | OccEndpoint;
}

declare module '@spartacus/core' {
  interface OccEndpoints extends S4omOccEndpoints {}
}
