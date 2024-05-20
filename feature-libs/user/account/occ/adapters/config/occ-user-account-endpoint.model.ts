/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccEndpoint } from '@spartacus/core';

export interface UserAccountOccEndpoints {
  /**
   * Get user account details
   */
  user?: string | OccEndpoint;

  /**
   * Create one time password for user login
   */
  createVerificationToken?: string | OccEndpoint;
}
declare module '@spartacus/core' {
  interface OccEndpoints extends UserAccountOccEndpoints {}
}
