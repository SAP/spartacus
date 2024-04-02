/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccConfig } from '@spartacus/core';

export const defaultOccOrderApprovalConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        orderApprovals: '/users/${userId}/orderapprovals',
        orderApproval:
          '/users/${userId}/orderapprovals/${orderApprovalCode}?fields=FULL',
        orderApprovalDecision:
          '/users/${userId}/orderapprovals/${orderApprovalCode}/decision',
      },
    },
  },
};
