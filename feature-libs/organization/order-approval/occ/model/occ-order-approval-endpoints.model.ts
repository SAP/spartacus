/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import type { OccEndpoint as CoreOccEndpoint } from '@spartacus/core';

declare module '@spartacus/core' {
  interface OccEndpoints {
    /**
     * Endpoint for order approvals
     *
     * @member {string}
     */
    orderApprovals?: string | CoreOccEndpoint;
    /**
     * Endpoint for order approval
     *
     * @member {string}
     */
    orderApproval?: string | CoreOccEndpoint;
    /**
     * Endpoint for order approval decision
     *
     * @member {string}
     */
    orderApprovalDecision?: string | CoreOccEndpoint;
  }
}
