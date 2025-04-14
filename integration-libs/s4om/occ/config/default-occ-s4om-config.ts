/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccConfig } from '@spartacus/core';
import { S4omOccEndpoints } from '../model';

export const defaultOccS4omConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        orderAttachments: 'users/${userId}/orders/${orderId}/attachments',
        downloadOrderAttachment:
          'users/${userId}/orders/${orderId}/attachments/${attachmentId}/download',
      } as S4omOccEndpoints,
    },
  },
};
