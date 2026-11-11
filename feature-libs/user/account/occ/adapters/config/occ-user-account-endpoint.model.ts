/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import type { OccEndpoint as CoreOccEndpoint } from '@spartacus/core';

export interface UserAccountOccEndpoints {
  /**
   * Get user account details
   */
  user?: string | CoreOccEndpoint;

  /**
   * Create one time password for user login
   */
  createVerificationToken?: string | CoreOccEndpoint;
}
declare module '@spartacus/core' {
  interface OccEndpoints extends UserAccountOccEndpoints {}
}
