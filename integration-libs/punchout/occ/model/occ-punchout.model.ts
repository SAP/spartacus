/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccEndpoint } from '@spartacus/core';

export interface PunchoutOccEndpoints {
  /**
   * Endpoint for the punchout session
   *
   * @member {string}
   */
  punchoutSession?: string | OccEndpoint;
  /**
   * Endpoint for the punchout Session Requisition
   *
   * @member {string}
   */
  punchoutSessionRequisition?: string | OccEndpoint;
}

declare module '@spartacus/core' {
  interface OccEndpoints extends PunchoutOccEndpoints {
    punchoutSession?: string | OccEndpoint;
    punchoutSessionRequisition?: string | OccEndpoint;
  }
}
