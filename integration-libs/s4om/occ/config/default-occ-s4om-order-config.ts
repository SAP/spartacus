/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccConfig } from '@spartacus/core';
import { S4OMOrderOccEndpoints } from '../model';

const s4omOrderOccEndpoints: S4OMOrderOccEndpoints = {
  orderAttachments: 'users/${userId}/orders/${orderId}/attachments',
  downloadOrderAttachment: 'users/${userId}/orders/${orderId}/attachments/${attachmentId}/download',
};

export const defaultOccS4OMOrderConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        ...s4omOrderOccEndpoints,
      },
    },
  },
};
