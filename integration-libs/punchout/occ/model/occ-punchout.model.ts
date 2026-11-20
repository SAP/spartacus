/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import type { OccEndpoint as CoreOccEndpoint } from '@spartacus/core';

export interface PunchoutOccEndpoints {
  /**
   * Endpoint for the punchout session
   *
   * @member {string}
   */
  punchoutSession?: string | CoreOccEndpoint;
  /**
   * Endpoint for the punchout Session Requisition
   *
   * @member {string}
   */
  punchoutSessionRequisition?: string | CoreOccEndpoint;
}

declare module '@spartacus/core' {
  interface OccEndpoints extends PunchoutOccEndpoints {
    punchoutSession?: string | CoreOccEndpoint;
    punchoutSessionRequisition?: string | CoreOccEndpoint;
  }
}
