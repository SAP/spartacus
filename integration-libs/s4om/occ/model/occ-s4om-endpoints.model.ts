/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccEndpoint } from '@spartacus/core';

export interface S4omOccEndpoints {
  /**
   * Endpoint for the user's one order attachments list
   */
  orderAttachments?: string | OccEndpoint;
  /**
   * Endpoint for download of user's order attachment
   */
  downloadOrderAttachment?: string | OccEndpoint;
}

declare module '@spartacus/core' {
  interface OccEndpoints extends S4omOccEndpoints {}
}
