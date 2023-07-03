/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccEndpoint } from '@spartacus/core';

export interface UserAccountOccEndpoints {
  /**
   * Get user account details
   */
  user?: string | OccEndpoint;
}
declare module '@spartacus/core' {
  interface OccEndpoints extends UserAccountOccEndpoints {}
}
